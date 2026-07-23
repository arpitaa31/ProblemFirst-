export type CuratedSolution = { title: string; why: string; detail: string; cost: string; effort: string; bestFor: string };

const libraries: Array<{ matches: string[]; solutions: CuratedSolution[] }> = [
  { matches: ["screen", "eye", "eyes", "monitor", "display"], solutions: [
    { title: "Use a 20–20–20 visual reset", why: "Short distance breaks reduce the sustained close-focus load that builds across a screen-heavy day.", detail: "Every 20 minutes, look about 20 feet away for 20 seconds.", cost: "$0", effort: "20 sec", bestFor: "Long screen sessions" },
    { title: "Tune text size and glare", why: "Small type and reflected light make your eyes work harder than they need to.", detail: "Increase text size first, then move or soften the brightest light source behind your display.", cost: "$0", effort: "5 min", bestFor: "Squinting or glare" },
    { title: "Check your viewing distance", why: "A screen that is too close or too low can increase eye strain and neck tension together.", detail: "Aim for roughly an arm’s length away, with the top of the screen around eye level.", cost: "$0", effort: "10 min", bestFor: "Desk-based work" },
  ] },
  { matches: ["sleep", "night", "insomnia", "switch off", "bed"], solutions: [
    { title: "Set one repeatable wind-down cue", why: "A consistent signal helps separate the end of the day from the start of sleep.", detail: "Choose one low-effort action you can repeat nightly, such as dimming lights or making tea.", cost: "$0", effort: "10 min", bestFor: "A busy mind at night" },
    { title: "Move your phone out of arm’s reach", why: "A little distance makes late-night checking less automatic.", detail: "Charge it across the room and use a basic alarm if you need one nearby.", cost: "$0–$15", effort: "5 min", bestFor: "Late scrolling" },
    { title: "Keep a short tomorrow list", why: "Writing down unfinished tasks can reduce the pressure to keep rehearsing them in bed.", detail: "Limit the list to three items and leave it outside the bedroom.", cost: "$0", effort: "3 min", bestFor: "Racing thoughts" },
  ] },
  { matches: ["overwhelmed", "overwhelm", "too much", "stress"], solutions: [
    { title: "Make a one-page triage list", why: "Putting every open loop in one place makes the next decision visible.", detail: "Write everything down, then mark only one item for today and two for later.", cost: "$0", effort: "10 min", bestFor: "Too many competing tasks" },
    { title: "Create one protected focus block", why: "A short protected window can restore a sense of progress without requiring a total reset.", detail: "Choose 25 minutes, silence notifications, and work on one clearly named task.", cost: "$0", effort: "25 min", bestFor: "Feeling scattered" },
    { title: "Move one task to a support channel", why: "Some weight comes from carrying work that belongs with another person or service.", detail: "Delegate, ask for an extension, or book the support that removes a bottleneck.", cost: "Varies", effort: "10 min", bestFor: "Workload that cannot fit" },
  ] },
  { matches: ["back", "workspace", "desk", "posture"], solutions: [
    { title: "Raise the screen before changing the chair", why: "Screen height often drives the forward head position that makes desk work uncomfortable.", detail: "Use a stable stack of books or monitor stand to bring the top of the screen near eye level.", cost: "$0–$40", effort: "10 min", bestFor: "Desk-related discomfort" },
    { title: "Add a supported sitting reset", why: "Frequent small position changes are more realistic than holding one perfect posture all day.", detail: "Set a reminder to stand, walk, or change position every 45–60 minutes.", cost: "$0", effort: "2 min", bestFor: "Long seated sessions" },
    { title: "Check the reach to your keyboard and mouse", why: "A long reach can keep your shoulders tense for hours.", detail: "Bring both closer so elbows can rest comfortably near your sides.", cost: "$0", effort: "5 min", bestFor: "Shoulder or upper-back tension" },
  ] },
  { matches: ["focus", "distract", "concentrate", "attention"], solutions: [
    { title: "Name one finishable task", why: "A specific finish line gives attention somewhere concrete to land.", detail: "Replace a broad task with the smallest visible outcome, such as drafting three bullets.", cost: "$0", effort: "3 min", bestFor: "Open-ended work" },
    { title: "Put one distraction out of reach", why: "Changing the environment is easier than relying on willpower alone.", detail: "Move your phone away, close unused tabs, or use a separate browser profile for focused work.", cost: "$0", effort: "5 min", bestFor: "Frequent interruptions" },
    { title: "Work in a short timed sprint", why: "A bounded commitment can make it easier to begin.", detail: "Set a 25-minute timer, then decide whether to continue after a brief break.", cost: "$0", effort: "25 min", bestFor: "Getting started" },
  ] },
];

const defaultSolutions: CuratedSolution[] = [
  { title: "Clarify the smallest useful outcome", why: "A precise outcome makes it easier to compare the kinds of help that fit.", detail: "Write one sentence describing what would feel different if this problem were lighter.", cost: "$0", effort: "5 min", bestFor: "An unclear starting point" },
  { title: "Explore one practical route", why: "Starting with one route keeps discovery useful instead of overwhelming.", detail: "Choose a product, service, expert, or DIY route to investigate first.", cost: "Varies", effort: "10 min", bestFor: "Comparing options" },
  { title: "Save the best fit to revisit", why: "A short list gives you a way to decide without starting the search over.", detail: "Keep the two or three options that match your needs, budget, and timing.", cost: "$0", effort: "5 min", bestFor: "Making a considered choice" },
];

export function getCuratedSolutions(query: string) {
  const normalized = query.toLowerCase();
  return libraries.find((library) => library.matches.some((match) => normalized.includes(match)))?.solutions ?? defaultSolutions;
}
