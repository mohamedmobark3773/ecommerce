"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, Bell,
  Sun, Moon, Grid, Store, Settings, LogOut, LayoutDashboard, Package, Zap,
} from "lucide-react";
import { useNavigate } from "@/hooks/useNavigate";
import { useAppContext } from "@/store/AppContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuth } from "@/store/slices/authSlice";
import { authService } from "@/services/auth.service";
import { storageKeys } from "@/constants/storageKeys";
import { removeStorageItem } from "@/utils/storage";
import { t } from "@/lib/i18n";

export function Navbar() {
  const { lang, setLang, cartCount } = useAppContext();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const navLinks = [
    { label: t(lang, "الرئيسية", "Home"), href: "/" },
    { label: t(lang, "المتجر", "Shop"), href: "/shop" },
    { label: t(lang, "العروض", "Deals"), href: "/shop" },
    { label: t(lang, "البائعون", "Sellers"), href: "/seller" },
  ];

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore backend logout errors and clear local auth state.
    } finally {
      dispatch(clearAuth());
      removeStorageItem(storageKeys.authToken);
      removeStorageItem(storageKeys.refreshToken);
      removeStorageItem(storageKeys.user);
      setUserOpen(false);
      navigate("login");
    }
  };

  const displayName = authState.user?.fullName || authState.user?.name || authState.user?.email || t(lang, "مستخدم", "User");
  const displayEmail = authState.user?.email || "";

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="font-medium">
            {t(lang, "🚀 شحن مجاني على الطلبات فوق 500 ج.م | استخدم كود: SOUQX50", "🚀 Free shipping over 500 EGP | Use code: SOUQX50")}
          </span>
          <div className="flex items-center gap-4">
            <span>📞 19XXX</span>
            <span>{t(lang, "مصر • الإمارات • السعودية", "Egypt • UAE • KSA")}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="font-black text-xl tracking-tight">
              <span className="text-primary">سوق</span>
              <span className="text-foreground">X</span>
            </div>
          </Link>

          {/* Category dropdown */}
          <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-muted text-sm font-semibold whitespace-nowrap transition-colors">
            <Grid className="w-4 h-4" />
            {t(lang, "الفئات", "Categories")}
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          {/* Search */}
          <div className={`flex-1 relative transition-all duration-200 ${searchFocus ? "max-w-2xl" : "max-w-xl"}`}>
            <div className="flex items-center bg-muted rounded-xl overflow-hidden border transition-colors focus-within:border-primary focus-within:bg-background">
              <span className="px-3 text-muted-foreground">
                <Search className="w-4 h-4" />
              </span>
              <input
                className="flex-1 py-2.5 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder={t(lang, "ابحث عن منتجات، علامات تجارية...", "Search products, brands...")}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
              <button className="px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                {t(lang, "بحث", "Search")}
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center transition-colors font-bold text-xs"
            >
              {lang === "ar" ? "EN" : "ع"}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -end-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              {notifOpen && (
                <div className="absolute top-full end-0 mt-2 w-80 bg-popover border border-border rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <span className="font-bold">{t(lang, "الإشعارات", "Notifications")}</span>
                    <span className="text-xs text-primary cursor-pointer">
                      {t(lang, "تحديد الكل كمقروء", "Mark all read")}
                    </span>
                  </div>
                  {[
                    { icon: "📦", text: t(lang, "طلبك #ORD-8821 تم توصيله بنجاح", "Order #ORD-8821 delivered"), time: t(lang, "منذ ساعة", "1h ago"), unread: true },
                    { icon: "💸", text: t(lang, "خصم 20% على الإلكترونيات اليوم فقط!", "20% off electronics today!"), time: t(lang, "منذ 3 ساعات", "3h ago"), unread: true },
                    { icon: "⭐", text: t(lang, "شكراً لتقييمك! حصلت على 50 نقطة", "Thanks for your review! You earned 50 pts"), time: t(lang, "أمس", "Yesterday"), unread: false },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 hover:bg-muted cursor-pointer transition-colors ${n.unread ? "bg-primary/5" : ""}`}
                    >
                      <span className="text-xl">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                      {n.unread && <span className="w-2 h-2 bg-primary rounded-full mt-1 shrink-0" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:flex w-9 h-9 rounded-xl hover:bg-muted items-center justify-center transition-colors"
            >
              <Heart className="w-4 h-4" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-sm font-semibold"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">{t(lang, "السلة", "Cart")}</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-white text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-sm font-medium">{displayName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:inline" />
              </button>
              {userOpen && (
                <div className="absolute top-full end-0 mt-2 w-52 bg-popover border border-border rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <p className="font-semibold text-sm">{displayName}</p>
                    <p className="text-xs text-muted-foreground">{displayEmail}</p>
                  </div>
                  {[
                    { icon: LayoutDashboard, label: t(lang, "لوحة التحكم", "Dashboard"), href: "/dashboard" },
                    { icon: Package, label: t(lang, "طلباتي", "My Orders"), href: "/orders" },
                    { icon: Heart, label: t(lang, "المفضلة", "Wishlist"), href: "/wishlist" },
                    { icon: Store, label: t(lang, "متجري", "My Store"), href: "/seller" },
                    { icon: Settings, label: t(lang, "الإعدادات", "Settings"), href: "/dashboard" },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link
                      key={href + label}
                      href={href}
                      onClick={() => setUserOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted text-sm transition-colors"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      {label}
                    </Link>
                  ))}
                  <div className="border-t border-border">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted text-sm text-red-500 transition-colors">
                      <LogOut className="w-4 h-4" />
                      {t(lang, "تسجيل الخروج", "Sign Out")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 pb-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
          >
            {t(lang, "لوحة الإدارة", "Admin")}
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="w-full block text-start px-4 py-3 rounded-xl hover:bg-muted font-semibold text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
