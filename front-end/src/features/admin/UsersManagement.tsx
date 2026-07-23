"use client";

import { useState } from "react";
import { User, Users, Store, Shield, Plus, Search, Download, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { usersData } from "@/lib/data";

export function UsersManagement() {
  const { lang } = useAppContext();
  const [tab, setTab] = useState("customers");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-black">{t(lang, "إدارة المستخدمين", "User Management")}</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl font-bold hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />{t(lang, "إضافة مستخدم", "Add User")}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: t(lang, "إجمالي المستخدمين", "Total Users"), value: "54,821", icon: Users, color: "#2563eb" },
          { label: t(lang, "عملاء", "Customers"), value: "51,240", icon: User, color: "#10b981" },
          { label: t(lang, "بائعون", "Sellers"), value: "2,841", icon: Store, color: "#f59e0b" },
          { label: t(lang, "مشرفون", "Admins"), value: "18", icon: Shield, color: "#8b5cf6" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-4">
            <div className="w-9 h-9 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${color}18` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className="font-black text-xl">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        {["customers", "sellers", "admins"].map((t2) => (
          <button key={t2} onClick={() => setTab(t2)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${tab === t2 ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`}>
            {t2 === "customers" ? t(lang, "العملاء", "Customers") : t2 === "sellers" ? t(lang, "البائعون", "Sellers") : t(lang, "المشرفون", "Admins")}
          </button>
        ))}
        <div className="ms-auto flex items-center gap-3">
          <div className="relative">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="ps-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors w-56" placeholder={t(lang, "بحث...", "Search...")} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />{t(lang, "تصدير", "Export")}
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {[t(lang, "المستخدم", "User"), t(lang, "الدور", "Role"), t(lang, "الحالة", "Status"), t(lang, "تاريخ الانضمام", "Joined"), t(lang, "الطلبات", "Orders"), t(lang, "الإنفاق", "Spent"), t(lang, "إجراءات", "Actions")].map((h) => (
                <th key={h} className="text-start px-5 py-4 text-xs font-bold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {usersData.map((u) => (
              <tr key={u.email} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/70 to-accent/70 flex items-center justify-center text-white font-bold text-sm shrink-0">{u.name[0]}</div>
                    <div>
                      <p className="font-semibold text-sm">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4"><Badge text={u.role} variant={u.role === "مدير" ? "purple" : u.role === "بائع" ? "info" : "default"} /></td>
                <td className="px-5 py-4"><Badge text={u.status} variant={u.status === "نشط" ? "success" : "danger"} /></td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{u.joined}</td>
                <td className="px-5 py-4 text-sm font-semibold">{u.orders > 0 ? u.orders : "—"}</td>
                <td className="px-5 py-4 text-sm font-semibold">{u.spent > 0 ? `${u.spent.toLocaleString("ar-EG")} ${t(lang, "ج.م", "EGP")}` : "—"}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-primary"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-primary"><Edit className="w-3.5 h-3.5" /></button>
                    <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors text-muted-foreground hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
