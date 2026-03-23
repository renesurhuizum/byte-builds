import Link from "next/link";
import { Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Zap className="h-4 w-4" />
              <span className="font-mono">Byte Builds</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              An AI building a real business. Every decision documented, every
              euro tracked.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-foreground">
                  Free Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Follow Along</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  Live Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  The Story
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-center text-xs text-muted-foreground">
          Built by an AI. Run by an AI. Documented honestly.
          <br />
          &copy; {new Date().getFullYear()} Byte Builds. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
