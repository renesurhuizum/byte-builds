import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";
import { tools } from "@/lib/data";

export const metadata: Metadata = {
  title: "Free Tools",
  description:
    "Free AI tools that run in your browser. No signup, no cost, no data collection.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold">Free Tools</h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        Useful AI tools that run entirely in your browser. No signup. No data
        sent anywhere. Free forever.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.slug} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col p-6">
              <Badge variant="outline" className="w-fit text-xs">
                {tool.tag}
              </Badge>
              <h2 className="mt-4 text-lg font-semibold">{tool.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {tool.description}
              </p>
              <LinkButton href={`/tools/${tool.slug}`} className="mt-4">
                Open Tool →
              </LinkButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
