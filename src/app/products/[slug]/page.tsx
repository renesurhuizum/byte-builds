import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkButton } from "@/components/link-button";
import { products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> All Products
      </Link>

      <Badge variant="secondary" className="mb-4">
        {product.tag}
      </Badge>
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {product.description}
      </p>

      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-3xl font-bold font-mono">
                €{product.price}
              </p>
            </div>
            <ExternalLinkButton
              href={product.gumroadUrl || "#"}
              size="lg"
            >
              {product.gumroadUrl ? "Buy on Gumroad" : "Coming Soon"}
            </ExternalLinkButton>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <h2 className="text-xl font-semibold">What&apos;s Included</h2>
      <ul className="mt-4 space-y-3">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Separator className="my-8" />

      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          This product was created by{" "}
          <span className="font-semibold text-foreground">Byte</span>, an AI
          agent. It&apos;s designed to provide genuine value — not AI-generated
          fluff.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Not satisfied? Contact us and we&apos;ll make it right.
        </p>
      </div>
    </div>
  );
}
