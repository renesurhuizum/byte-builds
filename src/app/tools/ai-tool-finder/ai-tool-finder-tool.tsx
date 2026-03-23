"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";

interface Question {
  question: string;
  options: { label: string; value: string }[];
}

interface Recommendation {
  name: string;
  description: string;
  bestFor: string;
  pricing: string;
  url: string;
}

const questions: Question[] = [
  {
    question: "What's your primary role?",
    options: [
      { label: "Marketing / Content", value: "marketing" },
      { label: "Developer / Engineering", value: "developer" },
      { label: "Business Owner / Manager", value: "business" },
      { label: "Designer / Creative", value: "creative" },
      { label: "Student / Researcher", value: "research" },
    ],
  },
  {
    question: "What do you want to automate?",
    options: [
      { label: "Writing & Content", value: "writing" },
      { label: "Data Analysis", value: "data" },
      { label: "Coding & Development", value: "coding" },
      { label: "Customer Support", value: "support" },
      { label: "General Productivity", value: "productivity" },
    ],
  },
  {
    question: "What's your budget?",
    options: [
      { label: "Free only", value: "free" },
      { label: "Up to $20/month", value: "low" },
      { label: "Up to $50/month", value: "mid" },
      { label: "$50+/month", value: "high" },
    ],
  },
  {
    question: "Technical skill level?",
    options: [
      { label: "Beginner — just getting started", value: "beginner" },
      { label: "Intermediate — comfortable with tools", value: "intermediate" },
      { label: "Advanced — can use APIs and code", value: "advanced" },
    ],
  },
  {
    question: "Team size?",
    options: [
      { label: "Just me", value: "solo" },
      { label: "Small team (2-10)", value: "small" },
      { label: "Larger team (10+)", value: "large" },
    ],
  },
];

const toolDatabase: Record<string, Recommendation[]> = {
  marketing: [
    { name: "Jasper", description: "AI marketing content platform", bestFor: "Marketing teams needing brand-consistent content", pricing: "From $49/mo", url: "https://jasper.ai" },
    { name: "Copy.ai", description: "AI copywriting tool", bestFor: "Quick marketing copy and social posts", pricing: "Free tier available", url: "https://copy.ai" },
    { name: "Canva AI", description: "Design + AI content in one", bestFor: "Visual content creation with AI assists", pricing: "Free tier, Pro from $13/mo", url: "https://canva.com" },
  ],
  developer: [
    { name: "Claude", description: "Advanced AI for analysis and coding", bestFor: "Complex reasoning, long documents, code review", pricing: "Free tier, Pro $20/mo", url: "https://claude.ai" },
    { name: "GitHub Copilot", description: "AI pair programmer in your IDE", bestFor: "Code completion and generation", pricing: "$10/mo", url: "https://github.com/features/copilot" },
    { name: "Cursor", description: "AI-native code editor", bestFor: "Full codebase understanding and editing", pricing: "Free tier, Pro $20/mo", url: "https://cursor.com" },
  ],
  business: [
    { name: "ChatGPT Plus", description: "General-purpose AI assistant", bestFor: "Versatile business tasks, analysis, writing", pricing: "$20/mo", url: "https://chat.openai.com" },
    { name: "Notion AI", description: "AI built into your workspace", bestFor: "Notes, docs, and project management with AI", pricing: "$10/mo add-on", url: "https://notion.so" },
    { name: "Zapier + AI", description: "Workflow automation with AI steps", bestFor: "Connecting apps and automating processes", pricing: "Free tier, from $20/mo", url: "https://zapier.com" },
  ],
  creative: [
    { name: "Midjourney", description: "AI image generation", bestFor: "High-quality artistic images", pricing: "From $10/mo", url: "https://midjourney.com" },
    { name: "Runway", description: "AI video and creative toolkit", bestFor: "Video editing and generation", pricing: "Free tier, from $12/mo", url: "https://runwayml.com" },
    { name: "Adobe Firefly", description: "AI integrated into Creative Cloud", bestFor: "AI-assisted design within Adobe ecosystem", pricing: "Included with CC", url: "https://firefly.adobe.com" },
  ],
  research: [
    { name: "Perplexity", description: "AI-powered research engine", bestFor: "Research with sources and citations", pricing: "Free tier, Pro $20/mo", url: "https://perplexity.ai" },
    { name: "Claude", description: "Advanced AI for analysis and reasoning", bestFor: "Analyzing papers, long documents, complex topics", pricing: "Free tier, Pro $20/mo", url: "https://claude.ai" },
    { name: "Elicit", description: "AI research assistant", bestFor: "Academic paper discovery and analysis", pricing: "Free tier available", url: "https://elicit.com" },
  ],
};

export function AiToolFinderTool() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  function handleAnswer(value: string) {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    setStep(step + 1);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  const isComplete = step >= questions.length;
  const recommendations = isComplete
    ? toolDatabase[answers[0]] || toolDatabase.business
    : [];

  return (
    <div className="mt-8">
      {!isComplete ? (
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {step + 1} / {questions.length}
              </Badge>
              <div className="h-1 flex-1 rounded-full bg-muted">
                <div
                  className="h-1 rounded-full bg-primary transition-all"
                  style={{
                    width: `${((step + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold">
              {questions[step].question}
            </h3>
            <div className="mt-4 space-y-2">
              {questions[step].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full rounded-lg border border-border p-3 text-left text-sm transition-colors hover:border-foreground/30 hover:bg-muted/50"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Your Recommended AI Tools
            </h3>
            <Button variant="outline" size="sm" onClick={reset}>
              Start Over
            </Button>
          </div>
          {recommendations.map((tool) => (
            <Card key={tool.name}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold">{tool.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {tool.pricing}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tool.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Best for:
                  </span>{" "}
                  {tool.bestFor}
                </p>
              </CardContent>
            </Card>
          ))}
          {/* Upsell */}
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Want the full database of 200+ AI tools?
            </p>
            <Badge variant="secondary" className="mt-2">
              €10
            </Badge>
            <p className="mt-2 font-semibold">The No-Code AI Tools Directory</p>
            <LinkButton href="/products/ai-tools-directory" variant="outline" size="sm" className="mt-3">
              Learn More →
            </LinkButton>
          </div>
        </div>
      )}
    </div>
  );
}
