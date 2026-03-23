"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";

interface AnalysisResult {
  score: number;
  checks: { label: string; passed: boolean; tip: string }[];
  suggestions: string[];
  improved: string;
}

function analyzePrompt(prompt: string): AnalysisResult {
  const text = prompt.trim();
  const words = text.split(/\s+/).length;
  const checks: { label: string; passed: boolean; tip: string }[] = [];
  const suggestions: string[] = [];

  // 1. Length check
  const hasGoodLength = words >= 15;
  checks.push({
    label: "Sufficient detail",
    passed: hasGoodLength,
    tip: hasGoodLength
      ? "Your prompt has enough detail to work with."
      : "Add more context. Prompts under 15 words are usually too vague.",
  });
  if (!hasGoodLength) suggestions.push("Expand your prompt with more context and specifics.");

  // 2. Role / persona
  const hasRole = /\b(act as|you are|as a|your role|pretend|imagine you|behave as)\b/i.test(text);
  checks.push({
    label: "Role definition",
    passed: hasRole,
    tip: hasRole
      ? "You've assigned a role — this helps the AI adopt the right perspective."
      : 'Define a role: e.g. "Act as a senior marketing strategist..."',
  });
  if (!hasRole) suggestions.push('Start with a role: "Act as a [specific expert]..."');

  // 3. Specificity — numbers, examples, constraints
  const hasSpecifics = /\b(\d+|example|e\.g\.|such as|for instance|specifically|exactly|at least|no more than)\b/i.test(text);
  checks.push({
    label: "Specificity",
    passed: hasSpecifics,
    tip: hasSpecifics
      ? "Good — you include specific details or constraints."
      : "Add numbers, examples, or constraints to make your prompt more precise.",
  });
  if (!hasSpecifics) suggestions.push('Add specifics: quantities ("give me 5..."), examples, or constraints.');

  // 4. Output format
  const hasFormat = /\b(format|bullet|list|table|json|markdown|paragraph|step.by.step|numbered|structure|csv|heading)\b/i.test(text);
  checks.push({
    label: "Output format",
    passed: hasFormat,
    tip: hasFormat
      ? "You've specified an output format — this reduces ambiguity."
      : 'Specify the desired output format: "Format as a bullet list..." or "Respond in JSON."',
  });
  if (!hasFormat) suggestions.push("Specify the output format you want (list, table, steps, etc.).");

  // 5. Context / audience
  const hasContext = /\b(audience|reader|target|beginner|expert|technical|non.technical|for a|aimed at|context|background)\b/i.test(text);
  checks.push({
    label: "Audience / context",
    passed: hasContext,
    tip: hasContext
      ? "You've provided audience or context information."
      : "Specify who the output is for: a beginner, an expert, a client, etc.",
  });
  if (!hasContext) suggestions.push("Add who the output is for (audience, skill level, context).");

  // 6. Constraints / boundaries
  const hasConstraints = /\b(don't|do not|avoid|must not|never|only|limit|exclude|without|keep it|max|minimum)\b/i.test(text);
  checks.push({
    label: "Constraints",
    passed: hasConstraints,
    tip: hasConstraints
      ? "You've set boundaries — this prevents unwanted output."
      : 'Add constraints: "Don\'t include...", "Keep it under 200 words", etc.',
  });
  if (!hasConstraints) suggestions.push("Add constraints to prevent unwanted output (length, style, exclusions).");

  // 7. Task clarity
  const hasTask = /\b(write|create|generate|analyze|summarize|explain|compare|list|design|draft|review|improve|translate|rewrite)\b/i.test(text);
  checks.push({
    label: "Clear task verb",
    passed: hasTask,
    tip: hasTask
      ? "Your prompt includes a clear action verb."
      : 'Start with a clear action: "Write...", "Analyze...", "Create..."',
  });
  if (!hasTask) suggestions.push("Use a clear action verb at the start (write, analyze, create, etc.).");

  // Calculate score
  const passed = checks.filter((c) => c.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  // Generate improved version
  let improved = text;
  if (!hasRole) improved = `Act as an expert in this topic. ${improved}`;
  if (!hasFormat) improved = `${improved}\n\nFormat your response as a structured list with clear headings.`;
  if (!hasConstraints) improved = `${improved}\n\nKeep the response concise and focused.`;

  return { score, checks, suggestions, improved };
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Needs work";
  return "Weak";
}

export function PromptOptimizerTool() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function handleAnalyze() {
    if (prompt.trim().length < 5) return;
    setResult(analyzePrompt(prompt));
  }

  return (
    <div className="mt-8 space-y-6">
      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste your AI prompt here..."
          className="h-40 w-full rounded-lg border border-input bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <Button
          onClick={handleAnalyze}
          disabled={prompt.trim().length < 5}
          className="mt-3"
        >
          Analyze Prompt
        </Button>
      </div>

      {result && (
        <>
          {/* Score */}
          <Card>
            <CardContent className="flex items-center gap-6 p-6">
              <div className="text-center">
                <p
                  className={`text-5xl font-bold font-mono ${getScoreColor(result.score)}`}
                >
                  {result.score}
                </p>
                <p className="text-xs text-muted-foreground">/ 100</p>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {getScoreLabel(result.score)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {result.checks.filter((c) => c.passed).length} of{" "}
                  {result.checks.length} checks passed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Checks */}
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {result.checks.map((check) => (
                <div
                  key={check.label}
                  className="flex items-start gap-3 p-4"
                >
                  <span className="mt-0.5 text-lg">
                    {check.passed ? "✅" : "⚠️"}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{check.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {check.tip}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">Suggestions</h3>
                <ul className="mt-3 space-y-2">
                  {result.suggestions.map((s) => (
                    <li
                      key={s}
                      className="text-sm text-muted-foreground before:mr-2 before:content-['→']"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Improved version */}
          {result.score < 100 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">Improved Version</h3>
                <pre className="mt-3 whitespace-pre-wrap rounded-md border border-border bg-muted/50 p-4 text-sm">
                  {result.improved}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => {
                    navigator.clipboard.writeText(result.improved);
                  }}
                >
                  Copy to clipboard
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Upsell */}
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Want 50+ ready-to-use, optimized prompts?
            </p>
            <Badge variant="secondary" className="mt-2">
              €12
            </Badge>
            <p className="mt-2 font-semibold">The AI Prompt Playbook</p>
            <LinkButton href="/products/ai-prompt-playbook" variant="outline" size="sm" className="mt-3">
              Learn More →
            </LinkButton>
          </div>
        </>
      )}
    </div>
  );
}
