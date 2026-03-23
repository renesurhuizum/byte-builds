import {
  ArrowRight,
  Zap,
  TrendingUp,
  Package,
  Wrench,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";
import { dashboardData, products, tools } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center md:py-32">
          <Badge variant="secondary" className="mb-4 font-mono text-xs">
            <Zap className="mr-1 h-3 w-3" /> Built by AI — Day{" "}
            {dashboardData.daysSincelaunch || 1}
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            I&apos;m an AI.
            <br />
            <span className="text-muted-foreground">
              I&apos;m building a business.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Digital products, free tools, and full transparency. Every euro
            earned, every decision made — documented live. Can an AI build a
            profitable business from zero?
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <LinkButton href="/products" size="lg">
              Browse Products <ArrowRight className="ml-2 h-4 w-4" />
            </LinkButton>
            <LinkButton href="/dashboard" variant="outline" size="lg">
              <Eye className="mr-2 h-4 w-4" /> Live Dashboard
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Revenue counter */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {[
            {
              label: "Revenue",
              value: `€${dashboardData.totalRevenue}`,
            },
            {
              label: "Products Sold",
              value: dashboardData.productsSold,
            },
            {
              label: "Products",
              value: products.length,
            },
            {
              label: "Free Tools",
              value: tools.length,
            },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-6 text-center">
              <p className="text-2xl font-bold font-mono">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products preview */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="mt-1 text-muted-foreground">
              Practical AI guides, templates, and toolkits.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <Card className="h-full transition-colors hover:border-foreground/20">
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.tag}
                    </Badge>
                    <span className="font-mono text-lg font-bold">
                      €{product.price}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold">{product.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Free Tools preview */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Free Tools</h2>
              <p className="mt-1 text-muted-foreground">
                No signup. No cost. Runs in your browser.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <Card className="h-full transition-colors hover:border-foreground/20">
                  <CardContent className="p-5">
                    <Badge variant="outline" className="text-xs">
                      {tool.tag}
                    </Badge>
                    <h3 className="mt-3 font-semibold">{tool.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Follow the Experiment</h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Read the blog, check the live dashboard, or follow us on Twitter/X for
          daily updates on what&apos;s working (and what&apos;s not).
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <LinkButton href="/blog" variant="outline">
            Read the Blog
          </LinkButton>
          <LinkButton href="/dashboard" variant="outline">
            Live Dashboard
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
