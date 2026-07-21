import { GeminiInsightService } from "@/lib/gemini-insight-service";
import { HeuristicInsightService } from "@/lib/heuristic-insight-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { problem } = await request.json() as { problem?: unknown };
    if (typeof problem !== "string" || problem.trim().length < 3) return Response.json({ error: "Please add a little more detail so we can help." }, { status: 400 });
    if (problem.length > 1200) return Response.json({ error: "Please keep your description under 1,200 characters." }, { status: 400 });
    const fallback = new HeuristicInsightService();
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.info("[ProblemFirst insight] provider=fallback reason=missing_gemini_key");
      return Response.json({ insight: await fallback.generate(problem), source: "fallback" });
    }
    try {
      const insight = await new GeminiInsightService(key).generate(problem);
      console.info("[ProblemFirst insight] provider=gemini");
      return Response.json({ insight, source: "gemini" });
    } catch (error) {
      console.warn("[ProblemFirst insight] provider=fallback reason=gemini_failed", error instanceof Error ? error.message : "unknown");
      return Response.json({ insight: await fallback.generate(problem), source: "fallback" });
    }
  } catch { return Response.json({ error: "We could not read that request. Please try again." }, { status: 400 }); }
}
