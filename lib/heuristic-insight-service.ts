import type { Insight, InsightProvider } from "@/lib/insight-types";

function limitedFallback(problem: string): Insight {
  const summary = problem.trim().replace(/\s+/g, " ").slice(0, 160);
  return {
    situation: `There is not enough reliable context to explain “${summary}” safely without the live reasoning service. Rather than inventing a cause, this response stays deliberately narrow.`,
    why: ["The right explanation depends on timing, severity, the setting, and what changed immediately before the issue began.", "Those details can point to very different practical solutions, so a broad guess would be less useful than a focused follow-up."],
    nextSteps: ["Try the request again in a moment so the live AI service can assess the full context.", "Add one concrete detail that changes the situation—when it started, what triggers it, or what you have already tried.", "If there is pain, danger, a sudden change, or a meaningful impact on daily life, contact the relevant qualified professional rather than waiting on an automated response."],
    seekHelp: "Seek prompt professional help for anything severe, sudden, unsafe, worsening, or difficult to manage day to day.",
    support: [{ category: "A more detailed follow-up", detail: "Timing, environment, and prior attempts make the live answer more precise.", icon: "✦" }, { category: "Relevant professional", detail: "A qualified person is the best next step when the issue needs individual assessment.", icon: "↗" }],
  };
}

const patterns: Array<{ match: RegExp; insight: Insight }> = [
  { match: /eye|screen|headache.*computer|computer.*headache/i, insight: {
    situation: "Screen discomfort usually builds gradually: tired eyes, a gritty feeling, or tension around the forehead can all make focused work harder.",
    why: ["People blink less often while concentrating, which lets the eye surface dry out.", "Glare, tiny text, close viewing distance, and an uncorrected vision prescription can add strain."],
    nextSteps: ["Try the 20-20-20 rhythm: every 20 minutes, look roughly 20 feet away for 20 seconds.", "Move the display about an arm’s length away, make text comfortably large, and reduce glare from windows or overhead lights.", "Use lubricating eye drops if they are appropriate for you, and take a proper screen-free break after long sessions."],
    seekHelp: "Arrange an optometrist or clinician visit if pain persists, vision changes, redness is significant, light feels painful, or headaches keep returning.",
    support: [{ category: "Screen comfort", detail: "A matte screen filter or anti-glare setup can soften reflected light.", icon: "◌" }, { category: "Vision check", detail: "Updated glasses can resolve strain that breaks alone cannot.", icon: "◎" }, { category: "Focus timer", detail: "A gentle reminder makes short breaks easier to keep.", icon: "◷" }],
    disclaimer: "This is general guidance, not a diagnosis." } },
  { match: /sleep|insomnia|can.t sleep|tired|exhausted/i, insight: {
    situation: "When sleep is off, it can feel as though the whole day has less room to cope. The goal is to make winding down more predictable, not to force sleep.",
    why: ["Late caffeine, irregular wake times, bright evening light, and mental load can keep the body in a more alert state.", "Trying hard to fall asleep can itself create pressure that makes settling harder."],
    nextSteps: ["Keep one consistent wake-up time for the next week, including weekends where possible.", "Create a short repeatable wind-down: dim lights, park tomorrow’s tasks on paper, and choose a low-stimulation activity.", "Keep caffeine earlier in the day and reserve the bed for sleep or quiet rest rather than scrolling."],
    seekHelp: "Speak with a healthcare professional if this lasts several weeks, affects safety or mood, or comes with loud snoring, breathing pauses, or extreme daytime sleepiness.",
    support: [{ category: "Wind-down ritual", detail: "A paper planner or calming audio can make the transition clearer.", icon: "☾" }, { category: "Light management", detail: "Warm, low lighting supports a calmer evening environment.", icon: "◐" }, { category: "Sleep professional", detail: "They can check for an underlying sleep disorder when needed.", icon: "◎" }],
    disclaimer: "This is general guidance, not a diagnosis." } },
  { match: /stress|anxious|anxiety|overwhelm|overwhelmed|burnout/i, insight: {
    situation: "Feeling overloaded is often a signal that the demands on you have outgrown the recovery and support around you.",
    why: ["Unfinished tasks keep pulling on attention, even when you are not actively working on them.", "Sleep, isolation, constant notifications, and uncertainty can lower your capacity to absorb normal stress."],
    nextSteps: ["Name the one thing that needs attention today; make the next action small enough to start in ten minutes.", "Create two short notification-free windows and use one for a walk, meal, or quiet reset.", "Tell someone you trust what has been building up instead of carrying the full load alone."],
    seekHelp: "Reach out to a mental-health professional or local crisis service promptly if you feel unsafe, hopeless, or unable to manage daily life.",
    support: [{ category: "Task reset", detail: "A simple priority list can turn noise into one clear next move.", icon: "✓" }, { category: "Guided support", detail: "A therapist or counsellor offers a confidential place to unpack it.", icon: "◎" }, { category: "Calming practice", detail: "Brief breathing or grounding prompts help create a pause.", icon: "◌" }],
    disclaimer: "This is general guidance and is not mental-health treatment." } },
];

export class HeuristicInsightService implements InsightProvider {
  async generate(problem: string): Promise<Insight> {
    const found = patterns.find(({ match }) => match.test(problem));
    return found ? found.insight : limitedFallback(problem);
  }
}
