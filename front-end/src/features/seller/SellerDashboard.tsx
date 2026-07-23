"use client";

import { useRouter } from "next/navigation";
import { DollarSign, ShoppingBag, Package, Star, Plus } from "lucide-react";
import {
  AreaChart, Area, PieChart as RechartPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { KPICard } from "@/components/ui/KPICard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { revenueData, pieData, orders } from "@/lib/data";

export function SellerDashboard() {
  const { lang } = useAppContext();
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black">{t(lang, "لوحة البائع", "Seller Dashboard")}</h1>
          <p className="text-muted-foreground">{t(lang, "آبل متجر الرسمي • عضو بلاتيني", "Apple Official Store • Platinum Member")}</p>
        </div>
        <button onClick={() => router.push("/seller/products")} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl font-bold hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />{t(lang, "إضافة منتج جديد", "Add New Product")}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: DollarSign, label: t(lang, "إجمالي الإيرادات", "Total Revenue"), value: "234,500 ج.م", color: "#10b981", trend: "+18.3%", up: true },
          { icon: ShoppingBag, label: t(lang, "إجمالي الطلبات", "Total Orders"), value: "1,842", color: "#2563eb", trend: "+12.4%", up: true },
          { icon: Package, label: t(lang, "المنتجات النشطة", "Active Products"), value: "87", color: "#8b5cf6", trend: "+4", up: true },
          { icon: Star, label: t(lang, "متوسط التقييم", "Avg. Rating"), value: "4.9 ⭐", color: "#f59e0b", trend: "+0.2", up: true },
        ].map((k) => <KPICard key={k.label} title={k.label} value={k.value} subtitle={t(lang, "مقارنة بالشهر الماضي", "vs last month")} icon={k.icon} color={k.color} trend={k.trend} trendUp={k.up} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-4">{t(lang, "إيرادات الأشهر الستة الأخيرة", "Revenue - Last 6 Months")}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData.slice(6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`${v.toLocaleString()} ج.م`, t(lang, "الإيراد", "Revenue")]} />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="#2563eb" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-4">{t(lang, "أداء المبيعات", "Sales Performance")}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RechartPie>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={4}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} />
            </RechartPie>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />{d.name}</div>
                <span className="font-bold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-bold">{t(lang, "أحدث الطلبات", "Recent Orders")}</h3>
          <button onClick={() => router.push("/orders")} className="text-primary text-sm font-semibold hover:underline">{t(lang, "عرض الكل", "View All")}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {[t(lang, "رقم الطلب", "Order ID"), t(lang, "العميل", "Customer"), t(lang, "المنتج", "Product"), t(lang, "المبلغ", "Amount"), t(lang, "الحالة", "Status"), t(lang, "التاريخ", "Date")].map((h) => (
                  <th key={h} className="text-start px-5 py-3 text-xs font-bold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{o.id}</td>
                  <td className="px-5 py-4 text-sm">محمد إبراهيم</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground truncate max-w-[180px]">{o.product}</td>
                  <td className="px-5 py-4 text-sm font-bold">{o.total.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</td>
                  <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
