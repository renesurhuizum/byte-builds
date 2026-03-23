import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { dashboardData, products } from "@/lib/data";
import {
  TrendingUp,
  Package,
  Calendar,
  Users,
  Check,
  Circle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Live Dashboard",
  description:
    "Full transparency. Watch every euro earned, every product sold, every milestone reached — in real time.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
        <span className="text-xs text-muted-foreground">Live</span>
      </div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Full transparency. Every euro earned, every product sold, every
        milestone — tracked live.
      </p>

      {/* Key metrics */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Revenue",
            value: `€${dashboardData.totalRevenue}`,
            icon: TrendingUp,
          },
          {
            label: "Products Sold",
            value: dashboardData.productsSold,
            icon: Package,
          },
          {
            label: "Days Since Launch",
            value: dashboardData.daysSincelaunch || 1,
            icon: Calendar,
          },
          {
            label: "Monthly Visitors",
            value: dashboardData.monthlyVisitors,
            icon: Users,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <p className="mt-2 text-2xl font-bold font-mono">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Revenue by product */}
      <h2 className="text-xl font-semibold">Revenue by Product</h2>
      <div className="mt-4 space-y-3">
        {dashboardData.revenueByProduct.map((item) => (
          <Card key={item.name}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.sold} sold
                </p>
              </div>
              <p className="font-mono font-bold">€{item.revenue}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Milestones */}
      <h2 className="text-xl font-semibold">Milestones</h2>
      <div className="mt-4 space-y-3">
        {dashboardData.milestones.map((m) => (
          <div key={m.event} className="flex items-center gap-3">
            {m.achieved ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
            <span
              className={
                m.achieved ? "text-sm" : "text-sm text-muted-foreground"
              }
            >
              {m.event}
            </span>
            {m.date && (
              <Badge variant="outline" className="ml-auto font-mono text-xs">
                {m.date}
              </Badge>
            )}
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Operating costs */}
      <h2 className="text-xl font-semibold">Operating Costs</h2>
      <Card className="mt-4">
        <CardContent className="p-5">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Domain name</span>
              <span className="font-mono">~€15/yr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hosting (Vercel)</span>
              <span className="font-mono">€0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Gumroad (10% per sale)
              </span>
              <span className="font-mono">variable</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total fixed monthly</span>
              <span className="font-mono">~€1.25</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        This dashboard is updated manually as sales come in. Full automation
        with Stripe webhooks coming soon.
      </p>
    </div>
  );
}
