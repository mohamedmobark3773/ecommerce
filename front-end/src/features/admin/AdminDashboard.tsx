"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, BarChart2, Package, Package2, Users, Store, Settings, LogOut, Shield, Download,
  DollarSign, ShoppingBag,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart as RechartPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { KPICard } from "@/components/ui/KPICard";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { revenueData, pieData, topSellers } from "@/lib/data";

export function AdminDashboard() {
  const { lang } = useAppContext();
  const router = useRouter();
  const [sidebarItem, setSidebarItem] = useState("overview");

  const sideNav = [
    { id: "overview", icon: LayoutDashboard, label: t(lang, "نظرة عامة", "Overview") },
    { id: "analytics", icon: BarChart2, label: t(lang, "التحليلات", "Analytics"), href: "/admin/analytics" },
    { id: "orders", icon: Package, label: t(lang, "الطلبات", "Orders"), href: "/orders" },
    { id: "products", icon: Package2, label: t(lang, "المنتجات", "Products"), href: "/seller/products" },
    { id: "users", icon: Users, label: t(lang, "المستخدمون", "Users"), href: "/admin/users" },
    { id: "sellers", icon: Store, label: t(lang, "البائعون", "Sellers") },
    { id: "settings", icon: Settings, label: t(lang, "الإعدادات", "Settings") },
  ];

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      {/* Admin sidebar */}
      <aside className="w-64 bg-sidebar border-e border-sidebar-border shrink-0 hidden lg:flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 bg-primary/10 rounded-2xl p-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm">{t(lang, "لوحة الإدارة", "Admin Panel")}</p>
              <p className="text-xs text-muted-foreground">{t(lang, "مدير النظام", "System Admin")}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sideNav.map((item) => (
            <button
              key={item.id}
              onClick={() => { setSidebarItem(item.id); if (item.href) router.push(item.href); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${sidebarItem === item.id ? "bg-primary text-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}
            >
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" />{t(lang, "تسجيل الخروج", "Sign Out")}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black">{t(lang, "لوحة تحكم المدير", "Admin Dashboard")}</h1>
            <p className="text-muted-foreground text-sm">{t(lang, "ديسمبر 2024 • تحديث منذ 5 دقائق", "December 2024 • Updated 5 min ago")}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />{t(lang, "تصدير التقرير", "Export Report")}
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: DollarSign, label: t(lang, "إجمالي الإيرادات", "Total Revenue"), value: "921,000 ج.م", subtitle: t(lang, "هذا الشهر", "This month"), color: "#10b981", trend: "+23.5%", up: true },
            { icon: ShoppingBag, label: t(lang, "إجمالي الطلبات", "Total Orders"), value: "4,690", subtitle: t(lang, "هذا الشهر", "This month"), color: "#2563eb", trend: "+18.2%", up: true },
            { icon: Users, label: t(lang, "مستخدمون جدد", "New Users"), value: "1,287", subtitle: t(lang, "هذا الشهر", "This month"), color: "#8b5cf6", trend: "+14.6%", up: true },
            { icon: Store, label: t(lang, "بائعون نشطون", "Active Sellers"), value: "2,841", subtitle: t(lang, "إجمالي", "Total"), color: "#f59e0b", trend: "+8.3%", up: true },
          ].map((k) => <KPICard key={k.label} {...k} />)}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold">{t(lang, "إيرادات هذا العام", "Revenue This Year")}</h3>
              <select className="text-xs bg-muted border-0 rounded-lg px-2 py-1 outline-none">
                {["2024", "2023"].map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => [`${(v / 1000).toFixed(0)}K ج.م`, t(lang, "الإيراد", "Revenue")]} />
                <Bar dataKey="revenue" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold mb-4">{t(lang, "توزيع المبيعات", "Sales Distribution")}</h3>
            <ResponsiveContainer width="100%" height={160}>
              <RechartPie>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" paddingAngle={3}>
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`]} />
              </RechartPie>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} /><span className="truncate">{d.name}</span><span className="font-bold ms-auto">{d.value}%</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold mb-4">{t(lang, "اتجاه الطلبات", "Orders Trend")}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2.5} dot={false} strokeDasharray="4 4" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">{t(lang, "أفضل البائعين", "Top Sellers")}</h3>
              <button onClick={() => router.push("/admin/users")} className="text-xs text-primary font-semibold hover:underline">{t(lang, "عرض الكل", "View All")}</button>
            </div>
            <div className="space-y-3">
              {topSellers.map((s, i) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-black text-muted-foreground shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm truncate">{s.name}</p>
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-full shrink-0">{s.badge}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.products} {t(lang, "منتج", "products")} • ⭐ {s.rating}</p>
                  </div>
                  <span className="text-sm font-black text-emerald-600 shrink-0">{(s.sales / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
