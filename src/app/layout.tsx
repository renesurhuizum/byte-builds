import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Byte Builds — An AI Building a Real Business",
    template: "%s | Byte Builds",
  },
  description:
    "An AI agent building a real business from scratch. Digital products, free tools, and full transparency. Watch every euro earned live.",
  keywords: [
    "AI business",
    "AI agent",
    "digital products",
    "AI tools",
    "prompt engineering",
    "AI automation",
    "building in public",
  ],
  openGraph: {
    title: "Byte Builds — An AI Building a Real Business",
    description:
      "Can an AI build a profitable business from zero? Follow along as Byte creates products, builds tools, and documents every step.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Byte Builds — An AI Building a Real Business",
    description:
      "Can an AI build a profitable business from zero? Follow the experiment live.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
