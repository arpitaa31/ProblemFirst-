import type { Insight, InsightProvider, SupportItem } from "@/lib/insight-types";

type Section = "situation" | "why" | "steps" | "help" | "support";
type Sections = Record<Section, string[]>;

function promptFor(problem: string) {
  return `You are a practical real-world problem solving assistant.

User problem:
${problem}

Give a helpful, specific answer including:
- What may be going on
- Why it might be happening
- Practical steps
- When to seek help
- Suggested support, tools, habits, or product categories when they genuinely fit

Avoid generic statements. Be specific to the user's situation. Do not repeat their wording in every sentence.

Use exactly these headings with concise lines below each:
What may be going on
Why it might be happening
Practical steps
When to seek help
Suggested support`;
}

function cleanLine(raw: string) {
  let line = raw.trim();
  while (line.startsWith("-") || line.startsWith("*") || line.startsWith("•")) line = line.slice(1).trim();
  if (line.length > 2 && line[0] >= "0" && line[0] <= "9") {
    const dot = line.indexOf(".");
    if (dot > 0 && dot < 4) line = line.slice(dot + 1).trim();
  }
  return line;
}

function headingToSection(line: string): Section | null {
  const heading = line.toLowerCase().replace(":", "").trim();
  if (heading.includes("what may be going") || heading === "situation") return "situation";
  if (heading.includes("why it might") || heading === "why") return "why";
  if (heading.includes("practical steps") || heading === "steps") return "steps";
  if (heading.includes("when to seek") || heading.includes("when should")) return "help";
  if (heading.includes("suggested support") || heading === "support" || heading.includes("useful support")) return "support";
  return null;
}

function sentences(text: string) {
  return text.split(".").map((item) => item.trim()).filter((item) => item.length > 18).map((item) => `${item}.`);
}

function mapRawText(text: string): Insight {
  const sections: Sections = { situation: [], why: [], steps: [], help: [], support: [] };
  let active: Section = "situation";
  for (const rawLine of text.split("\n")) {
    const line = cleanLine(rawLine);
    if (!line) continue;
    const heading = headingToSection(line);
    if (heading) { active = heading; continue; }
    sections[active].push(line);
  }

  const fragments = sentences(text);
  const situation = (sections.situation.join(" ") || fragments.slice(0, 2).join(" ") || text).slice(0, 420);
  const why = sections.why.length ? sections.why.slice(0, 3) : fragments.slice(1, 4);
  const nextSteps = sections.steps.length ? sections.steps.slice(0, 4) : fragments.slice(3, 7);
  const seekHelp = sections.help.join(" ") || "Seek relevant professional help if symptoms are severe, sudden, worsening, unsafe, or interfere with daily life.";
  const support: SupportItem[] = sections.support.slice(0, 4).map((category) => ({ category, detail: "A relevant direction to consider for this situation.", icon: "✦" }));

  if (!situation || !why.length || !nextSteps.length) throw new Error("Gemini text could not be mapped into useful guidance");
  return { situation, why, nextSteps, seekHelp, support };
}

export class GeminiInsightService implements InsightProvider {
  constructor(private apiKey: string) {}

  async generate(problem: string): Promise<Insight> {
    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
    console.info("[ProblemFirst insight] API key exists:", Boolean(this.apiKey));
    console.info("[ProblemFirst insight] Gemini called:", model);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: promptFor(problem) }] }] }),
      signal: AbortSignal.timeout(18000),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("[ProblemFirst insight] Gemini API error:", response.status, body);
      throw new Error(`Gemini request failed with ${response.status}`);
    }

    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.info("[ProblemFirst insight] Gemini raw response:", text);
    if (!text.trim()) throw new Error("Gemini returned no text");
    return mapRawText(text);
  }
}
