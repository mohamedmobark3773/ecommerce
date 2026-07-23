import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { ElementType } from "react";

export function KPICard({
  title,
  label,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
  trendUp,
}: {
  title?: string;
  label?: string;
  value: string;
  subtitle: string;
  icon: ElementType;
  color: string;
  trend?: string;
  trendUp?: boolean;
}) {
  const displayTitle = title ?? label ?? "";
  return (
    <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: `${color}18` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              trendUp
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {trendUp ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm font-semibold text-foreground/80">{displayTitle}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
    </div>
  );
}
