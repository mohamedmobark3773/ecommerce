"use client";

import { useState } from "react";
import { Package2, Check, Map } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { orders } from "@/lib/data";

export function OrdersPage() {
  const { lang } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = [
    { id: "all", label: t(lang, "الكل", "All") },
    { id: "delivered", label: t(lang, "مُسلَّم", "Delivered") },
    { id: "shipped", label: t(lang, "في الطريق", "In Transit") },
    { id: "processing", label: t(lang, "قيد المعالجة", "Processing") },
    { id: "cancelled", label: t(lang, "ملغي", "Cancelled") },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black mb-6">{t(lang, "طلباتي", "My Orders")}</h1>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button key={f.id} onClick={() => setActiveFilter(f.id)} className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${activeFilter === f.id ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {orders.filter((o) => activeFilter === "all" || o.status === activeFilter).map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-md transition-all">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-black text-primary text-lg">{order.id}</span>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-sm text-muted-foreground">{order.date} • {order.items} {t(lang, "منتجات", "items")}</p>
              </div>
              <span className="font-black text-xl">{order.total.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl mb-4">
              <Package2 className="w-8 h-8 text-primary bg-primary/10 rounded-xl p-1.5 shrink-0" />
              <span className="text-sm font-medium">{order.product}</span>
            </div>
            {order.status !== "cancelled" && (
              <div className="flex items-center justify-between mb-4">
                {[t(lang, "تم الطلب", "Ordered"), t(lang, "تم التأكيد", "Confirmed"), t(lang, "جاري التحضير", "Preparing"), t(lang, "في الطريق", "Shipped"), t(lang, "تم التوصيل", "Delivered")].map((s, i) => {
                  const completedSteps = ({ delivered: 5, shipped: 4, processing: 2, cancelled: 0 } as Record<string, number>)[order.status] || 0;
                  const done = i < completedSteps;
                  const current = i === completedSteps - 1;
                  return (
                    <div key={s} className="flex flex-col items-center gap-1 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? "bg-emerald-500 text-white" : current ? "bg-primary text-white ring-4 ring-primary/25" : "bg-muted text-muted-foreground"}`}>
                        {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <span className="text-[10px] text-muted-foreground text-center hidden sm:block leading-tight max-w-16">{s}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">{t(lang, "تفاصيل الطلب", "Order Details")}</button>
              {order.status === "delivered" && (
                <button className="flex-1 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors">{t(lang, "إضافة تقييم", "Write Review")}</button>
              )}
              {order.status !== "delivered" && order.status !== "cancelled" && (
                <button className="flex-1 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                  <Map className="w-4 h-4" />{t(lang, "تتبع الشحنة", "Track Shipment")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
