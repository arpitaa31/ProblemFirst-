import type { Insight, InsightProvider } from "@/lib/insight-types";

const systemInstruction = `You are a highly practical problem-solving assistant for ProblemFirst. Analyze real-life problems and give clear, specific, real-world guidance that reads like a thoughtful expert who understands the exact situation.

STRICT RULES:
- Never repeat the user's wording in every sentence or start with formulae such as "For [problem]".
- Never use generic self-help filler, including "write it down", "a few small factors can overlap", "try one small change", or "take it one day at a time", unless it is unusually and concretely relevant.
- Do not give vague coaching. Name likely mechanisms, constraints, or causes that relate directly to this person’s described situation.
- Make every action observable and practical: include a setting to change, a specific habit, a timing, a measurement, or a realistic decision point when useful.
- Suggest tools, support, or product categories only when they materially fit; never force a product into the answer.
- Vary sentence structure and priorities naturally. Do not reuse stock framing.
- Be appropriately cautious: do not diagnose, overstate certainty, promote a brand, or make unsafe recommendations. For health, legal, finance, or safety concerns, clearly state meaningful escalation signs.

Return ONLY valid JSON, exactly with these fields:
{
  "situation": "a concise, context-aware understanding",
  "why": ["2 or 3 concrete causes or contributing factors"],
  "nextSteps": ["3 or 4 specific, practical actions"],
  "seekHelp": "real conditions when expert or urgent help is appropriate",
  "support": [{"category":"relevant tool, habit, service, or product category","detail":"why it helps here","icon":"a single simple symbol"}],
  "disclaimer": "only when it is warranted"
}

Example standard: for screen-related eye discomfort, explain reduced blinking/dryness, brightness or glare mismatch, and uninterrupted near-focus; then recommend night mode or a warm display setting, the 20-20-20 break, matching display brightness to ambient light, and anti-glare or eye-care support. Do not copy this example into unrelated answers.`;

function parseInsight(text: string): Insight {
  const clean = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  const parsed: unknown = JSON.parse(clean);
  if (!parsed || typeof parsed !== "object") throw new Error("Gemini did not return an object");
  const result = parsed as Insight;
  if (!result.situation || !Array.isArray(result.why) || !Array.isArray(result.nextSteps) || !result.seekHelp || !Array.isArray(result.support)) throw new Error("Gemini response was incomplete");
  return result;
}

export class GeminiInsightService implements InsightProvider {
  constructor(private apiKey: string) {}

  async generate(problem: string): Promise<Insight> {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: `Give a fresh, problem-specific next-step plan for this exact situation:\n\n${problem}` }] }], systemInstruction: { parts: [{ text: systemInstruction }] }, generationConfig: { responseMimeType: "application/json", temperature: 0.9, maxOutputTokens: 1200 } }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error(`Gemini request failed with ${response.status}`);
    const payload = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");
    if (!text) throw new Error("Gemini returned no content");
    return parseInsight(text);
  }
}
