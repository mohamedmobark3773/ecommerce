"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Trash2, Tag, Check, Shield, ArrowLeft, ArrowRight } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { useNavigate } from "@/hooks/useNavigate";
import { useAppContext } from "@/store/AppContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCart } from "@/store/slices/cartSlice";
import { cartService } from "@/services/cart.service";
import { t } from "@/lib/i18n";
import type { Cart, CartItem, Product } from "@/types";

export function CartPage() {
  const { lang } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const items = useMemo(() => {
    return cart.items.map((item) => {
      const product = typeof item.product === "object" && item.product ? (item.product as Product) : null;
      const unitPrice = item.price ?? product?.price ?? 0;
      const lineTotal = (item.subtotal ?? item.quantity * unitPrice) || 0;
      const image = product?.images?.[0] ?? "";
      const title = product?.name ?? product?.slug ?? "Product";
      const seller = typeof product?.brand === "object" && product?.brand ? product.brand.name : typeof product?.brand === "string" ? product.brand : "";
      const rating = 4.5;

      return {
        ...item,
        image,
        title,
        seller,
        rating,
        unitPrice,
        lineTotal,
      };
    });
  }, [cart.items]);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal - discount + shipping;

  const applyCartMutation = async (mutator: () => Promise<Cart | null>) => {
    setIsMutating(true);
    try {
      const nextCart = await mutator();
      if (nextCart) {
        dispatch(setCart(nextCart));
      }
    } finally {
      setIsMutating(false);
    }
  };

  const handleRemove = (item: CartItem) => {
    if (!item.id) return;
    void applyCartMutation(() => cartService.removeItem(item.id));
  };

  const handleQuantityChange = (item: CartItem, nextQuantity: number) => {
    if (!item.id || nextQuantity < 1) return;
    const price = item.price || 0;
    void applyCartMutation(() => cartService.updateItem(item.id, {
      quantity: nextQuantity,
      price,
      subtotal: nextQuantity * price,
    }));
  };

  const handleClear = () => {
    void applyCartMutation(() => cartService.clear());
  };

  const emptyState = items.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black mb-8">
        {t(lang, "سلة التسوق", "Shopping Cart")} {" "}
        <span className="text-muted-foreground font-normal text-lg">({items.length})</span>
      </h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {emptyState ? (
            <div className="bg-card border border-border rounded-3xl p-16 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t(lang, "السلة فارغة", "Cart is Empty")}</h3>
              <p className="text-muted-foreground mb-6">{t(lang, "لم تضف أي منتجات بعد", "You haven't added any products yet")}</p>
              <Link href="/shop" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-bold">{t(lang, "تصفح المنتجات", "Browse Products")}</Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/20 transition-all">
                <img src={item.image || "/images/placeholder.png"} alt="" className="w-24 h-24 object-cover rounded-xl bg-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{item.seller}</p>
                      <h3 className="font-bold text-sm mt-0.5">{item.title}</h3>
                      <StarRating rating={item.rating} />
                    </div>
                    <button disabled={isMutating} onClick={() => handleRemove(item)} className="text-muted-foreground hover:text-red-500 transition-colors p-1 disabled:opacity-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-muted rounded-xl overflow-hidden">
                      <button disabled={isMutating} onClick={() => handleQuantityChange(item, Math.max(1, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-border transition-colors text-sm font-bold disabled:opacity-50">-</button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button disabled={isMutating} onClick={() => handleQuantityChange(item, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-border transition-colors text-sm font-bold disabled:opacity-50">+</button>
                    </div>
                    <span className="font-black text-primary">{item.lineTotal.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="flex justify-end">
            <button disabled={isMutating || emptyState} onClick={handleClear} className="text-sm font-semibold text-red-500 disabled:opacity-50">
              {t(lang, "مسح السلة", "Clear Cart")}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-3 flex items-center gap-2"><Tag className="w-4 h-4 text-primary" />{t(lang, "كود الخصم", "Coupon Code")}</h3>
            <div className="flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1 px-4 py-2.5 bg-muted border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-colors" placeholder={t(lang, "أدخل الكود", "Enter code")} />
              <button onClick={() => { if (coupon) setCouponApplied(true); }} className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${couponApplied ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                {couponApplied ? <Check className="w-4 h-4" /> : t(lang, "تطبيق", "Apply")}
              </button>
            </div>
            {couponApplied && <p className="text-xs text-emerald-600 mt-2 font-semibold">✓ {t(lang, "تم تطبيق خصم 10%!", "10% discount applied!")}</p>}
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-4">{t(lang, "ملخص الطلب", "Order Summary")}</h3>
            <div className="space-y-3 text-sm">
              {[
                [t(lang, "المجموع الفرعي", "Subtotal"), subtotal],
                ...(couponApplied ? [[t(lang, "الخصم (-10%)", "Discount (-10%)"), -discount] as [string, number]] : []),
                [t(lang, "الشحن", "Shipping"), shipping] as [string, number],
              ].map((row, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-muted-foreground">{row[0]}</span>
                  <span className={`font-semibold ${(row[1] as number) < 0 ? "text-emerald-600" : ""}`}>
                    {(row[1] as number) < 0 ? "-" : ""}{Math.abs(row[1] as number).toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}
                  </span>
                </div>
              ))}
              {shipping === 0 && <p className="text-xs text-emerald-600 font-semibold">✓ {t(lang, "شحن مجاني!", "Free shipping!")}</p>}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold text-base">{t(lang, "الإجمالي", "Total")}</span>
                <span className="font-black text-xl text-primary">{total.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
              </div>
            </div>
            <button onClick={() => navigate("checkout")} className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 mt-5 flex items-center justify-center gap-2">
              {t(lang, "المتابعة للدفع", "Proceed to Checkout")}
              {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            {t(lang, "دفع آمن ومشفر 100%", "100% secure & encrypted payment")}
          </div>
        </div>
      </div>
    </div>
  );
}
