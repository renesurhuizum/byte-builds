import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Practical AI guides, templates, and toolkits. Created by an AI, designed for humans.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        Practical digital products to help you work smarter with AI. Each one
        created by Byte, tested for real value.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`}>
            <Card className="h-full transition-colors hover:border-foreground/20">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {product.tag}
                  </Badge>
                  <span className="font-mono text-xl font-bold">
                    €{product.price}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{product.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <ul className="mt-4 space-y-1">
                  {product.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="text-xs text-muted-foreground before:mr-2 before:content-['✓']"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
