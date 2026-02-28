import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, refImage, aspectRatio, resolution } = await req.json();

    const YUNWU_API_KEY = Deno.env.get("YUNWU_API_KEY");
    if (!YUNWU_API_KEY) {
      throw new Error("YUNWU_API_KEY is not configured");
    }

    // Build resolution suffix
    const resolutionMap: Record<string, string> = {
      '1K': '1024x1024',
      '2K': '2048x2048',
      '4K': '4096x4096',
    };
    const resText = resolutionMap[resolution] || resolution || '2048x2048';
    const ratioText = aspectRatio || '1:1';

    // Build user message content
    const userContent: any[] = [];

    // Add text prompt with resolution and aspect ratio instructions
    const enhancedPrompt = `${prompt || "Generate a beautiful image"}. Output image resolution: ${resText}, aspect ratio: ${ratioText}.`;
    userContent.push({
      type: "text",
      text: enhancedPrompt,
    });

    // Add reference image if provided
    if (refImage) {
      userContent.push({
        type: "image_url",
        image_url: { url: refImage },
      });
    }

    const response = await fetch("https://yunwu.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${YUNWU_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: userContent,
          },
        ],
        temperature: 1,
        max_tokens: 8192,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Yunwu API error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "请求过于频繁，请稍后再试。" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: `AI 模型调用失败 [${response.status}]` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    // Extract generated image from response
    const choice = data.choices?.[0];
    const message = choice?.message;

    // Check for inline images in the response
    let generatedImageUrl: string | null = null;
    let textContent: string | null = null;

    if (message?.images && message.images.length > 0) {
      // Image returned in images array (base64)
      generatedImageUrl = message.images[0]?.image_url?.url || null;
    }

    if (message?.content) {
      textContent = message.content;
      // Check if content contains base64 image data
      if (!generatedImageUrl && typeof textContent === 'string') {
        const base64Match = textContent.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
        if (base64Match) {
          generatedImageUrl = base64Match[0];
        }
      }
    }

    // Also check for multipart content
    if (!generatedImageUrl && Array.isArray(message?.content)) {
      for (const part of message.content) {
        if (part.type === 'image_url') {
          generatedImageUrl = part.image_url?.url || null;
          break;
        }
        if (part.type === 'text') {
          textContent = part.text;
        }
      }
    }

    return new Response(
      JSON.stringify({
        imageUrl: generatedImageUrl,
        text: textContent,
        raw: data,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-image error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
