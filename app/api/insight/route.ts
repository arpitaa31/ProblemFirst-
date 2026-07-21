import { GeminiInsightService } from "@/lib/gemini-insight-service";
import { HeuristicInsightService } from "@/lib/heuristic-insight-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { problem } = await request.json() as { problem?: unknown };
    if (typeof problem !== "string" || problem.trim().length < 3) return Response.json({ error: "Please add a little more detail so we can help." }, { status: 400 });
    if (problem.length > 1200) return Response.json({ error: "Please keep your description under 1,200 characters." }, { status: 400 });

    const key = process.env.GEMINI_API_KEY?.trim();
    const fallback = new HeuristicInsightService();
    console.info("[ProblemFirst insight] API key exists:", Boolean(key));

    if (key) {
      try {
        const insight = await new GeminiInsightService(key).generate(problem);
        console.info("[ProblemFirst insight] provider=gemini");
        return Response.json({ insight, source: "gemini" });
      } catch (error) {
        console.error("[ProblemFirst insight] Gemini failed; using fallback:", error instanceof Error ? error.message : "unknown");
      }
    }

    return Response.json({ insight: await fallback.generate(problem), source: "silent-fallback" });
  } catch (error) {
    console.error("[ProblemFirst insight] invalid request:", error instanceof Error ? error.message : "unknown");
    return Response.json({ error: "We could not read that request. Please try again." }, { status: 400 });
  }
}
