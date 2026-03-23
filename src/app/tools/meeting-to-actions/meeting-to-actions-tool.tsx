"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";

interface ParsedMeeting {
  actionItems: string[];
  decisions: string[];
  followUps: string[];
  keyTopics: string[];
}

function parseMeetingNotes(text: string): ParsedMeeting {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const actionItems: string[] = [];
  const decisions: string[] = [];
  const followUps: string[] = [];
  const keyTopics: string[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();

    // Action items
    if (
      /\b(action|todo|to.do|task|assign|need to|needs to|should|must|will do|responsible for|take care of)\b/i.test(line) &&
      line.length > 10
    ) {
      actionItems.push(line.replace(/^[-•*]\s*/, ""));
    }
    // Decisions
    else if (
      /\b(decided|agreed|decision|approved|confirmed|resolved|concluded|we will|we'll|going with|chosen|selected)\b/i.test(line) &&
      line.length > 10
    ) {
      decisions.push(line.replace(/^[-•*]\s*/, ""));
    }
    // Follow-ups
    else if (
      /\b(follow.up|check.in|review|revisit|next meeting|schedule|update on|report back|circle back|get back)\b/i.test(line) &&
      line.length > 10
    ) {
      followUps.push(line.replace(/^[-•*]\s*/, ""));
    }
    // Key topics (longer lines that seem like topic headers or important points)
    else if (
      (line.endsWith(":") || /^#{1,3}\s/.test(line) || line.length > 30) &&
      !lower.startsWith("hi") &&
      !lower.startsWith("hello") &&
      !lower.startsWith("thanks")
    ) {
      if (keyTopics.length < 5) {
        keyTopics.push(line.replace(/^[-•*#]\s*/, "").replace(/:$/, ""));
      }
    }
  }

  // If nothing matched, do a simpler heuristic
  if (actionItems.length === 0 && decisions.length === 0) {
    for (const line of lines) {
      if (line.length > 20 && line.length < 200) {
        const hasName = /\b[A-Z][a-z]+\b/.test(line);
        const hasVerb = /\b(will|should|need|must|can|could)\b/i.test(line);
        if (hasName && hasVerb && actionItems.length < 5) {
          actionItems.push(line.replace(/^[-•*]\s*/, ""));
        }
      }
    }
  }

  return { actionItems, decisions, followUps, keyTopics };
}

export function MeetingToActionsTool() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<ParsedMeeting | null>(null);

  function handleParse() {
    if (notes.trim().length < 20) return;
    setResult(parseMeetingNotes(notes));
  }

  const totalItems = result
    ? result.actionItems.length + result.decisions.length + result.followUps.length
    : 0;

  return (
    <div className="mt-8 space-y-6">
      <div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your meeting notes here..."
          className="h-48 w-full rounded-lg border border-input bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <Button
          onClick={handleParse}
          disabled={notes.trim().length < 20}
          className="mt-3"
        >
          Extract Actions
        </Button>
      </div>

      {result && (
        <>
          <Card>
            <CardContent className="p-6">
              <p className="font-semibold">
                Found {totalItems} items
              </p>
              <p className="text-sm text-muted-foreground">
                {result.actionItems.length} actions, {result.decisions.length}{" "}
                decisions, {result.followUps.length} follow-ups
              </p>
            </CardContent>
          </Card>

          {result.actionItems.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <span>📋</span> Action Items
                </h3>
                <ul className="mt-3 space-y-2">
                  {result.actionItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 h-4 w-4 shrink-0 rounded border border-border" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.decisions.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <span>✅</span> Decisions
                </h3>
                <ul className="mt-3 space-y-2">
                  {result.decisions.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground before:mr-2 before:content-['—']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.followUps.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <span>🔄</span> Follow-ups
                </h3>
                <ul className="mt-3 space-y-2">
                  {result.followUps.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground before:mr-2 before:content-['→']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {totalItems === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No clear action items found. Try pasting more structured
                  meeting notes with names and action verbs.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Upsell */}
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Want professional templates for every meeting type?
            </p>
            <Badge variant="secondary" className="mt-2">
              €8
            </Badge>
            <p className="mt-2 font-semibold">
              Meeting Notes to Action Items — Template Pack
            </p>
            <LinkButton href="/products/meeting-notes-template-pack" variant="outline" size="sm" className="mt-3">
              Learn More →
            </LinkButton>
          </div>
        </>
      )}
    </div>
  );
}
