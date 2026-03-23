import type { Metadata } from "next";
import { MeetingToActionsTool } from "./meeting-to-actions-tool";

export const metadata: Metadata = {
  title: "Meeting → Actions Converter — Free Tool",
  description:
    "Paste raw meeting notes and instantly extract action items, decisions, and follow-ups. Free, private, runs entirely in your browser.",
  keywords: [
    "meeting notes to action items",
    "extract action items from meeting",
    "meeting summary tool",
    "meeting notes converter",
  ],
};

export default function MeetingToActionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Meeting → Actions Converter</h1>
      <p className="mt-2 text-muted-foreground">
        Paste raw meeting notes and instantly extract action items, decisions,
        and follow-ups. Runs entirely in your browser — nothing leaves your
        device.
      </p>
      <MeetingToActionsTool />
    </div>
  );
}
