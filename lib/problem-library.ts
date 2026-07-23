export type ProblemCard = { title: string; prompt: string; description: string; category: string; icon: string; tint: string };

export const problems: ProblemCard[] = [
  { title: "Screen fatigue", prompt: "My eyes hurt after a day on screens", description: "Find a more comfortable rhythm for focused work.", category: "Body & wellbeing", icon: "◉", tint: "" },
  { title: "A restless night", prompt: "I cannot switch off at night", description: "Build an evening that lets your mind land.", category: "Mind & energy", icon: "☾", tint: "" },
  { title: "Everything feels too much", prompt: "I feel overwhelmed by everything", description: "Make space, reduce the noise, begin again.", category: "Mind & energy", icon: "◌", tint: "" },
  { title: "Workday back pain", prompt: "My workspace is hurting my back", description: "Small adjustments for a kinder desk setup.", category: "Body & wellbeing", icon: "↔", tint: "" },
  { title: "Losing focus", prompt: "I keep getting distracted when I need to focus", description: "Protect attention without fighting yourself.", category: "Work & study", icon: "⌁", tint: "" },
  { title: "Money feels messy", prompt: "I am stressed about keeping track of my money", description: "Turn vague worry into a first clear picture.", category: "Home & money", icon: "⌘", tint: "" },
  { title: "Hard conversations", prompt: "I need to have a difficult conversation", description: "Prepare words that keep the door open.", category: "Relationships", icon: "↗", tint: "" },
  { title: "Too much clutter", prompt: "My home feels cluttered and stressful", description: "Find a starting point that is not overwhelming.", category: "Home & money", icon: "□", tint: "" },
];

export const categories = ["All", "Body & wellbeing", "Mind & energy", "Work & study", "Relationships", "Home & money"];
