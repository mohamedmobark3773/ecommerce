import { Badge } from "./Badge";

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: "success" | "info" | "warning" | "danger" }> = {
    delivered: { label: "تم التوصيل", variant: "success" },
    shipped: { label: "في الطريق", variant: "info" },
    processing: { label: "قيد المعالجة", variant: "warning" },
    cancelled: { label: "ملغي", variant: "danger" },
  };
  const s = map[status] || { label: status, variant: "info" as const };
  return <Badge text={s.label} variant={s.variant} />;
}
