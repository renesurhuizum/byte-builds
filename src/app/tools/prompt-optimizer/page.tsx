import type { Metadata } from "next";
import { PromptOptimizerTool } from "./prompt-optimizer-tool";

export const metadata: Metadata = {
  title: "AI Prompt Optimizer — Free Tool",
  description:
    "Paste any AI prompt and get an instant analysis with improvement suggestions. Scores your prompt on specificity, structure, and clarity. Free, no signup.",
  keywords: [
    "ai prompt optimizer",
    "chatgpt prompt improver",
    "better ai prompts",
    "prompt engineering tool",
  ],
};

export default function PromptOptimizerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">AI Prompt Optimizer</h1>
      <p className="mt-2 text-muted-foreground">
        Paste any prompt and get an instant analysis with improvement
        suggestions. Runs in your browser — nothing is sent to any server.
      </p>
      <PromptOptimizerTool />
    </div>
  );
}
