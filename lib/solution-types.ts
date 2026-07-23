export type PracticalSolution = {
  title: string;
  why: string;
  detail: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedCost: string;
  estimatedTime: string;
  effectiveness?: string;
  related?: string[];
};
