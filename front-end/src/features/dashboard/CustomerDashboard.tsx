"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, User, MapPin, Shield, Bell, Package, Heart,
  Star, DollarSign, Award, Camera, Edit, Lock, Phone, Activity,
  Package2, ChevronLeft,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { orders } from "@/lib/data";

export function CustomerDashboard() {
  const { lang } = useAppContext();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: t(lang, "نظرة عامة", "Overview"), icon: LayoutDashboard },
    { id: "profile", label: t(lang, "الملف الشخصي", "Profile"), icon: User },
    { id: "addresses", label: t(lang, "العناوين", "Addresses"), icon: MapPin },
    { id: "security", label: t(lang, "الأمان", "Security"), icon: Shield },
    { id: "notifications", label: t(lang, "الإشعارات", "Notifications"), icon: Bell },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0">
          <div className="bg-card border border-border rounded-3xl p-5 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-black">م</div>
              <div>
                <p className="font-black">محمد إبراهيم</p>
                <p className="text-xs text-muted-foreground">m.ibrahim@email.com</p>
                <div className="flex items-center gap-1 mt-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /><span className="text-xs font-semibold text-amber-600">عميل مميز</span></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-border pt-4">
              {[[t(lang, "طلباتي", "Orders"), "24"], [t(lang, "مفضلة", "Wishlist"), "12"], [t(lang, "مراجعات", "Reviews"), "8"]].map(([l, v]) => (
                <div key={l}><div className="font-black text-lg text-primary">{v}</div><div className="text-muted-foreground">{l}</div></div>
              ))}
            </div>
          </div>
          <nav className="bg-card border border-border rounded-3xl overflow-hidden">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors border-b border-border last:border-0 ${activeTab === tab.id ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground/70"}`}>
                <tab.icon className="w-4 h-4" />{tab.label}
                {activeTab === tab.id && <ChevronLeft className={`w-4 h-4 ms-auto ${lang === "en" ? "rotate-180" : ""}`} />}
              </button>
            ))}
            <Link href="/orders" className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-muted text-foreground/70 border-b border-border">
              <Package className="w-4 h-4" />{t(lang, "طلباتي", "My Orders")}
            </Link>
            <Link href="/wishlist" className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-muted text-foreground/70">
              <Heart className="w-4 h-4" />{t(lang, "المفضلة", "Wishlist")}
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-6">
          {activeTab === "overview" && (
            <>
              <h1 className="text-2xl font-black">{t(lang, "أهلاً، محمد! 👋", "Welcome, Mohamed! 👋")}</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Package, label: t(lang, "إجمالي الطلبات", "Total Orders"), value: "24", color: "#2563eb" },
                  { icon: DollarSign, label: t(lang, "إجمالي الإنفاق", "Total Spent"), value: "34,500 ج.م", color: "#10b981" },
                  { icon: Heart, label: t(lang, "المفضلة", "Wishlist"), value: "12", color: "#ef4444" },
                  { icon: Award, label: t(lang, "نقاط المكافآت", "Reward Points"), value: "2,450", color: "#f59e0b" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-card border border-border rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${color}18` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="font-black text-xl">{value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-4">{t(lang, "أحدث الطلبات", "Recent Orders")}</h3>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((o) => (
                    <div key={o.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                      <Package2 className="w-8 h-8 text-primary bg-primary/10 rounded-xl p-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{o.id}</p>
                        <p className="text-xs text-muted-foreground">{o.product}</p>
                      </div>
                      <div className="text-end">
                        <StatusBadge status={o.status} />
                        <p className="text-xs text-muted-foreground mt-1">{o.total.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/orders" className="w-full block mt-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors text-center">
                  {t(lang, "عرض جميع الطلبات", "View All Orders")}
                </Link>
              </div>
            </>
          )}

          {activeTab === "profile" && (
            <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-xl">{t(lang, "الملف الشخصي", "Profile Information")}</h2>
                <button className="flex items-center gap-2 text-primary text-sm font-semibold hover:bg-primary/10 px-3 py-2 rounded-xl transition-colors">
                  <Edit className="w-4 h-4" />{t(lang, "تعديل", "Edit")}
                </button>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-black relative">
                  م
                  <button className="absolute -bottom-1 -end-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                <div>
                  <p className="font-black text-lg">محمد إبراهيم</p>
                  <p className="text-sm text-muted-foreground">m.ibrahim@email.com</p>
                  <p className="text-xs text-primary font-semibold mt-1">{t(lang, "عضو منذ يناير 2024", "Member since January 2024")}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  [t(lang, "الاسم الأول", "First Name"), "محمد"],
                  [t(lang, "اسم العائلة", "Last Name"), "إبراهيم"],
                  [t(lang, "البريد الإلكتروني", "Email"), "m.ibrahim@email.com"],
                  [t(lang, "رقم الهاتف", "Phone"), "+20 10 1234 5678"],
                  [t(lang, "تاريخ الميلاد", "Date of Birth"), "15 مارس 1990"],
                  [t(lang, "الجنس", "Gender"), t(lang, "ذكر", "Male")],
                ].map(([label, value]) => (
                  <div key={label}>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">{label}</label>
                    <div className="px-4 py-3 bg-muted rounded-xl text-sm font-medium">{value}</div>
                  </div>
                ))}
              </div>
              <button className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors">
                {t(lang, "حفظ التغييرات", "Save Changes")}
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <h2 className="font-black text-xl">{t(lang, "إعدادات الأمان", "Security Settings")}</h2>
              {[
                { icon: Lock, title: t(lang, "كلمة المرور", "Password"), sub: t(lang, "آخر تغيير: منذ 3 أشهر", "Last changed: 3 months ago"), action: t(lang, "تغيير", "Change") },
                { icon: Phone, title: t(lang, "التحقق بخطوتين", "Two-Factor Auth"), sub: t(lang, "حماية إضافية لحسابك", "Extra security for your account"), action: t(lang, "تفعيل", "Enable"), badge: t(lang, "غير مفعل", "Disabled") },
                { icon: Activity, title: t(lang, "جلسات النشاط", "Active Sessions"), sub: t(lang, "3 أجهزة مسجلة دخول", "3 devices logged in"), action: t(lang, "إدارة", "Manage") },
              ].map(({ icon: Icon, title, sub, action, badge }) => (
                <div key={title} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{title}</p>
                      {badge && <span className="text-xs bg-amber-500/10 text-amber-600 font-semibold px-2 py-0.5 rounded-full">{badge}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{sub}</p>
                  </div>
                  <button className="text-primary font-semibold text-sm hover:bg-primary/10 px-4 py-2 rounded-xl transition-colors">{action}</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
              <h2 className="font-black text-xl">{t(lang, "إعدادات الإشعارات", "Notification Settings")}</h2>
              <div className="space-y-4">
                {[
                  [t(lang, "إشعارات الطلبات", "Order Notifications"), t(lang, "تحديثات حالة الطلبات", "Order status updates"), true],
                  [t(lang, "العروض والخصومات", "Deals & Discounts"), t(lang, "احصل على أفضل العروض", "Get the best deals"), true],
                  [t(lang, "المنتجات الجديدة", "New Products"), t(lang, "اطلع على أحدث المنتجات", "Stay updated on new items"), false],
                  [t(lang, "النشرة البريدية", "Newsletter"), t(lang, "ملخص أسبوعي", "Weekly digest"), false],
                ].map(([title, sub, enabled]) => (
                  <div key={title as string} className="flex items-center justify-between p-4 border border-border rounded-2xl">
                    <div>
                      <p className="font-semibold text-sm">{title as string}</p>
                      <p className="text-xs text-muted-foreground">{sub as string}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${enabled ? "bg-primary" : "bg-muted"} relative`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${enabled ? "end-0.5" : "start-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
