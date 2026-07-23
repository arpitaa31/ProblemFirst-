import type { PracticalSolution } from "@/lib/solution-types";

/** A local, deterministic response for example searches when the network is unavailable. */
export class HeuristicInsightService {
  generate(problem: string): PracticalSolution[] {
    const isOverheatingLaptop = /laptop|computer/.test(problem.toLowerCase()) && /overheat|hot|fan/.test(problem.toLowerCase());

    if (isOverheatingLaptop) return [
      { title: "Situation", why: "Your laptop is getting hot and its fan is working loudly during video calls.", detail: "Calls can combine camera, browser, and graphics work, exposing cooling or background-load issues.", difficulty: "Easy", estimatedCost: "$0", estimatedTime: "Now" },
      { title: "Why this may be happening", why: "Restricted airflow or a high CPU workload can trap heat and make the fan run harder.", detail: "Dust in the vents, a soft surface, or background apps are common contributors.", difficulty: "Easy", estimatedCost: "$0", estimatedTime: "5 min" },
      { title: "Next steps", why: "Start with low-risk checks before considering a repair.", detail: "Use a hard surface, close unused apps and tabs, then clear the cooling vents with compressed air after shutting the laptop down.", difficulty: "Easy", estimatedCost: "$0–$15", estimatedTime: "10–15 min" },
      { title: "Support if it persists", why: "Persistent overheating may need a hardware inspection, especially on an older device.", detail: "Update the laptop maker's drivers first. If heat remains high or the device shuts down, contact an authorised repair service, particularly while under warranty.", difficulty: "Medium", estimatedCost: "Varies", estimatedTime: "30 min+" },
    ];

    return [
      { title: "Situation", why: `You are looking for a practical way forward with: “${problem.trim()}”.`, detail: "Keep the problem specific and focus first on the most direct contributing factors.", difficulty: "Easy", estimatedCost: "$0", estimatedTime: "Now" },
      { title: "Why this may be happening", why: "The environment, routine, and tools involved can all contribute to a recurring problem.", detail: "Look for what changes when the problem appears or gets worse.", difficulty: "Easy", estimatedCost: "$0", estimatedTime: "10 min" },
      { title: "Next steps", why: "A small, reversible first step makes it easier to learn what will actually help.", detail: "Identify the most likely source, make one targeted adjustment, and note whether the problem improves before spending money.", difficulty: "Easy", estimatedCost: "$0", estimatedTime: "15 min" },
      { title: "Support if it persists", why: "Some issues need hands-on assessment or specialist equipment to resolve safely.", detail: "If it keeps returning, contact a qualified local provider and ask for an explanation and estimate before committing to work.", difficulty: "Medium", estimatedCost: "Varies", estimatedTime: "30 min+" },
    ];
  }
}
