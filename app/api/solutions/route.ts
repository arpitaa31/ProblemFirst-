import { getLibrarySolutions } from "@/lib/solution-library";
import type { PracticalSolution } from "@/lib/solution-types";

export const runtime = "nodejs";

function parseSolutions(value: string): PracticalSolution[] | null {
  try {
    const content = value.match(/\[[\s\S]*\]/)?.[0];
    const parsed = content ? JSON.parse(content) : null;
    if (!Array.isArray(parsed) || parsed.length < 3) return null;
    return parsed.filter((item): item is PracticalSolution => typeof item?.title === "string" && typeof item?.why === "string" && typeof item?.detail === "string" && ["Easy", "Medium", "Hard"].includes(item?.difficulty) && typeof item?.estimatedCost === "string" && typeof item?.estimatedTime === "string").slice(0, 5);
  } catch { return null; }
}

export async function POST(request: Request) {
  try {
    const { problem } = await request.json() as { problem?: unknown };
    if (typeof problem !== "string" || problem.trim().length < 3) return Response.json({ error: "Add a little more detail so we can find practical solutions." }, { status: 400 });
    if (problem.length > 1200) return Response.json({ error: "Please keep your search under 1,200 characters." }, { status: 400 });
    const library = getLibrarySolutions(problem);
    const hasLibraryMatch = !library.some((solution) => solution.title === "Inspect the most likely source first");
    if (hasLibraryMatch || !process.env.GEMINI_API_KEY?.trim()) return Response.json({ solutions: library, source: "curated-library" });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY.trim())}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: `Return only a JSON array of 3 to 5 concrete, problem-specific solutions for: ${JSON.stringify(problem)}. Each object must have title, why, detail, difficulty (Easy, Medium, or Hard), estimatedCost, estimatedTime, effectiveness, and related (array of product or service names). Do not give coaching advice, introductions, diagnoses, or generic productivity tips. Include only direct practical solutions. For health or safety issues, keep suggestions low-risk and note when professional help is appropriate.` }] }], generationConfig: { temperature: 0.25, responseMimeType: "application/json" } }) });
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const generated = parseSolutions(data.candidates?.[0]?.content?.parts?.[0]?.text ?? "");
    return Response.json({ solutions: generated ?? library, source: generated ? "solution-engine" : "curated-library" });
  } catch { return Response.json({ solutions: getLibrarySolutions(""), source: "curated-library" }); }
}
