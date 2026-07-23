import { getLibrarySolutions } from "@/lib/solution-library";
import type { PracticalSolution } from "@/lib/solution-types";

export const runtime = "nodejs";

function parseSolutions(value: string): PracticalSolution[] | null {
  try {
    const content = value.match(/\[[\s\S]*\]/)?.[0];
    const parsed = content ? JSON.parse(content) : null;
    if (!Array.isArray(parsed)) return null;
    const valid = parsed.filter((item): item is PracticalSolution => typeof item?.title === "string" && typeof item?.why === "string" && typeof item?.detail === "string" && ["Easy", "Medium", "Hard"].includes(item?.difficulty) && typeof item?.estimatedCost === "string" && typeof item?.estimatedTime === "string");
    return valid.length >= 5 ? valid.slice(0, 10) : null;
  } catch { return null; }
}

export async function POST(request: Request) {
  try {
    const { problem } = await request.json() as { problem?: unknown };
    if (typeof problem !== "string" || problem.trim().length < 3) return Response.json({ error: "Add a little more detail so we can find practical solutions." }, { status: 400 });
    if (problem.length > 1200) return Response.json({ error: "Please keep your search under 1,200 characters." }, { status: 400 });
    const library = getLibrarySolutions(problem);
    const hasLibraryMatch = !library.some((solution) => solution.title === "Inspect the most likely source first");
    if ((hasLibraryMatch && library.length >= 5) || !process.env.GEMINI_API_KEY?.trim()) return Response.json({ solutions: library, source: "curated-library" });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY.trim())}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: `You are a recommendation engine for a solution-discovery product. Return only a JSON array of 5 to 10 distinct, concrete, problem-specific real-world solutions for: ${JSON.stringify(problem)}. Order recommendations from simplest and lowest-cost to more advanced. Each object must have title, why, detail, difficulty (Easy, Medium, or Hard), estimatedCost, and estimatedTime. The title must name a real action, repair, product, service, or procedure. The why field must explain the practical mechanism in one or two sentences. Never write motivational advice, coaching, therapy, reflection, productivity tips, goals, or abstract suggestions. Forbidden examples include “clarify the smallest useful outcome,” “explore one practical route,” “reflect on your situation,” and “consider your goals.” Do not include greetings, follow-up questions, diagnoses, or conversational language. For health or safety issues, keep suggestions low-risk and state when qualified professional help is appropriate.` }] }], generationConfig: { temperature: 0.15, responseMimeType: "application/json" } }) });
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const generated = parseSolutions(data.candidates?.[0]?.content?.parts?.[0]?.text ?? "");
    return Response.json({ solutions: generated ?? library, source: generated ? "solution-engine" : "curated-library" });
  } catch { return Response.json({ solutions: getLibrarySolutions(""), source: "curated-library" }); }
}
