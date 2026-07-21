export type SupportItem = { category: string; detail: string; icon: string };

export type Insight = {
  situation: string;
  why: string[];
  nextSteps: string[];
  seekHelp: string;
  support: SupportItem[];
  disclaimer?: string;
};

export interface InsightProvider {
  generate(problem: string): Promise<Insight>;
}
