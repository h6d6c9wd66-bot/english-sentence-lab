export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return corsResponse(null);
    if (request.method !== "POST") return corsResponse({ error: "Use POST" }, 405);

    try {
      const { mode, text } = await request.json();
      if (!text || !["translate", "correct"].includes(mode)) {
        return corsResponse({ error: "Missing mode or text" }, 400);
      }

      const prompt = mode === "translate"
        ? `你是一个英语口语老师。把中文翻译成自然、常用、可脱口而出的英文。返回严格 JSON，字段为 english, note, alternatives, grammar。grammar 是中文数组，解释语法和表达逻辑。中文：${text}`
        : `你是一个英语口语老师。纠正这句英文，让它自然、地道、适合日常口语。返回严格 JSON，字段为 corrected, explanation, alternatives, grammar。grammar 是中文数组，解释错误和改法。英文：${text}`;

      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-5.4-mini",
          input: prompt
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return corsResponse({ error: errorText }, response.status);
      }

      const data = await response.json();
      const textOutput = data.output_text || (data.output || [])
        .flatMap((item) => item.content || [])
        .map((item) => item.text || "")
        .join("");

      const json = JSON.parse(textOutput.replace(/^```json\s*|\s*```$/g, "").trim());
      return corsResponse(json);
    } catch (error) {
      return corsResponse({ error: String(error) }, 500);
    }
  }
};

function corsResponse(body, status = 200) {
  return new Response(body ? JSON.stringify(body) : null, {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
