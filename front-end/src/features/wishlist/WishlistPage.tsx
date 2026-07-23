"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useNavigate } from "@/hooks/useNavigate";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { products } from "@/lib/data";

export function WishlistPage() {
  const { lang } = useAppContext();
  const navigate = useNavigate();
  const [wished, setWished] = useState(products.slice(0, 6).map((p) => p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">
          {t(lang, "قائمة المفضلة", "Wishlist")}{" "}
          <span className="text-muted-foreground font-normal text-lg">({wished.length})</span>
        </h1>
        <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/10 px-4 py-2 rounded-xl transition-colors">
          <ShoppingCart className="w-4 h-4" />{t(lang, "إضافة الكل للسلة", "Add All to Cart")}
        </button>
      </div>
      {wished.length === 0 ? (
        <div className="bg-card border border-border rounded-3xl p-16 text-center">
          <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">{t(lang, "لا توجد منتجات مفضلة", "No Wishlist Items")}</h3>
          <p className="text-muted-foreground mb-6">{t(lang, "أضف المنتجات المفضلة لديك هنا", "Save your favorite products here")}</p>
          <Link href="/shop" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-bold">{t(lang, "تسوق الآن", "Shop Now")}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.filter((p) => wished.includes(p.id)).map((p) => (
            <div key={p.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="relative aspect-square bg-muted overflow-hidden">
                <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <button onClick={() => setWished((w) => w.filter((id) => id !== p.id))} className="absolute top-2 end-2 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold line-clamp-1 mb-1">{lang === "ar" ? p.name : p.nameEn}</p>
                <p className="text-sm font-black text-primary mb-2">{p.price.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</p>
                <button onClick={() => navigate("cart")} className="w-full py-2 bg-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                  {t(lang, "أضف للسلة", "Add to Cart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
