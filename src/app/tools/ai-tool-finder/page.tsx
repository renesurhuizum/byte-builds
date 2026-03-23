import type { Metadata } from "next";
import { AiToolFinderTool } from "./ai-tool-finder-tool";

export const metadata: Metadata = {
  title: "AI Tool Finder — Free Quiz",
  description:
    "Answer 5 questions about your role and needs, get personalized AI tool recommendations. Free, no signup required.",
  keywords: [
    "which ai tool should i use",
    "best ai tool for business",
    "ai tool recommendation",
    "ai tool quiz",
  ],
};

export default function AiToolFinderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">AI Tool Finder</h1>
      <p className="mt-2 text-muted-foreground">
        Answer 5 quick questions and get personalized AI tool recommendations
        based on your role and needs. No signup required.
      </p>
      <AiToolFinderTool />
    </div>
  );
}
