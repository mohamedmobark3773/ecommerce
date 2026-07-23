"use client";

import { Download, TrendingUp, ShoppingBag, DollarSign, Users } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { KPICard } from "@/components/ui/KPICard";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { revenueData, categories, products } from "@/lib/data";

export function AnalyticsPage() {
  const { lang } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black">{t(lang, "التحليلات المتقدمة", "Advanced Analytics")}</h1>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none">
            <option>{t(lang, "آخر 12 شهر", "Last 12 months")}</option>
            <option>{t(lang, "آخر 6 أشهر", "Last 6 months")}</option>
            <option>{t(lang, "هذا الشهر", "This month")}</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />{t(lang, "تصدير", "Export")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: TrendingUp, label: t(lang, "نمو الإيرادات", "Revenue Growth"), value: "+23.5%", sub: t(lang, "مقارنة بالعام الماضي", "YoY"), color: "#10b981", trend: "+23.5%", up: true },
          { icon: ShoppingBag, label: t(lang, "معدل التحويل", "Conversion Rate"), value: "3.84%", sub: t(lang, "من الزوار للمشترين", "Visitors to buyers"), color: "#2563eb", trend: "+0.4%", up: true },
          { icon: DollarSign, label: t(lang, "متوسط قيمة الطلب", "Avg. Order Value"), value: "1,968 ج.م", sub: t(lang, "لكل طلب", "Per order"), color: "#8b5cf6", trend: "+12%", up: true },
          { icon: Users, label: t(lang, "معدل الاحتفاظ", "Retention Rate"), value: "68.4%", sub: t(lang, "عملاء عائدون", "Returning customers"), color: "#f59e0b", trend: "+5.2%", up: true },
        ].map((k) => <KPICard key={k.label} title={k.label} value={k.value} subtitle={k.sub} icon={k.icon} color={k.color} trend={k.trend} trendUp={k.up} />)}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg">{t(lang, "تحليل الإيرادات السنوي", "Annual Revenue Analysis")}</h3>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-primary rounded" />{t(lang, "الإيرادات", "Revenue")}</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-accent rounded" />{t(lang, "الطلبات", "Orders")}</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="#2563eb" fillOpacity={0.08} />
            <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={2.5} fill="#06b6d4" fillOpacity={0.08} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-4">{t(lang, "أداء الفئات", "Category Performance")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categories.slice(0, 6).map((c) => ({ name: lang === "ar" ? c.name : c.nameEn, value: c.count }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold mb-4">{t(lang, "نمو المستخدمين", "User Growth")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-bold">{t(lang, "أداء المنتجات", "Product Performance")}</h3>
        </div>
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {[t(lang, "المنتج", "Product"), t(lang, "المبيعات", "Sales"), t(lang, "الإيراد", "Revenue"), t(lang, "التقييم", "Rating"), t(lang, "الأداء", "Performance")].map((h) => (
                <th key={h} className="text-start px-5 py-3 text-xs font-bold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p, i) => {
              const rev = p.price * p.reviews * 0.1;
              const perf = 65 + i * 4;
              return (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-10 rounded-xl object-cover bg-muted shrink-0" />
                      <span className="font-semibold text-sm">{lang === "ar" ? p.name : p.nameEn}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold">{(p.reviews * 0.08).toFixed(0)}k</td>
                  <td className="px-5 py-4 text-sm font-semibold text-emerald-600">{(rev / 1000).toFixed(0)}K {t(lang, "ج.م", "EGP")}</td>
                  <td className="px-5 py-4"><span className="text-sm font-bold text-amber-600">⭐ {p.rating}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${perf}%` }} />
                      </div>
                      <span className="text-xs font-bold w-8">{perf}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
