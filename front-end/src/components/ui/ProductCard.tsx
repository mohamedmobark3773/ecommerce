"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { StarRating } from "./StarRating";
import { useAppContext } from "@/store/AppContext";
import { useAppDispatch } from "@/store/hooks";
import { setCart } from "@/store/slices/cartSlice";
import { cartService } from "@/services/cart.service";
import { t } from "@/lib/i18n";
type ProductCardData = {
  id?: string | number;
  name?: string;
  nameEn?: string;
  price?: number;
  oldPrice?: number;
  image?: string;
  images?: string[];
  badge?: string;
  seller?: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  brand?: { name?: string } | string | null;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const { lang } = useAppContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [wished, setWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const currentPrice = product.price ?? 0;
  const oldPrice = product.oldPrice ?? currentPrice;
  const discount = oldPrice > currentPrice ? Math.round((1 - currentPrice / oldPrice) * 100) : 0;
  const title = product.name ?? product.nameEn ?? "Product";
  const image = product.image ?? product.images?.[0] ?? "";
  const seller = typeof product.brand === "object" && product.brand ? product.brand.name : typeof product.brand === "string" ? product.brand : product.seller ?? "";
  const rating = product.rating ?? 0;
  const reviewCount = product.reviews ?? 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!product.id) {
      return;
    }

    try {
      const nextCart = await cartService.addItem({
        product: product.id,
        quantity: 1,
        price: currentPrice,
        subtotal: currentPrice,
        currency: "EGP",
      });

      if (nextCart) {
        dispatch(setCart(nextCart));
      }

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch {
      setAddedToCart(false);
    }
  };

  return (
    <div
      onClick={() => {
        if (product.id) {
          router.push(`/product?productId=${product.id}`);
        } else {
          router.push("/product");
        }
      }}
      className="group bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative overflow-hidden bg-muted aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div
            className={`absolute top-3 ${lang === "ar" ? "right-3" : "left-3"} px-2.5 py-1 rounded-lg text-xs font-bold text-white ${
              product.badge.includes("فلاش") || product.badge.includes("خصم")
                ? "bg-red-500"
                : product.badge.includes("جديد")
                ? "bg-emerald-500"
                : "bg-primary"
            }`}
          >
            {product.badge}
          </div>
        )}
        {oldPrice > currentPrice && (
          <div
            className={`absolute top-3 ${lang === "ar" ? "left-3" : "right-3"} bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg`}
          >
            -{discount}%
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWished(!wished);
          }}
          className={`absolute bottom-3 ${lang === "ar" ? "left-3" : "right-3"} w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
            wished
              ? "bg-red-500 text-white"
              : "bg-white/80 text-foreground hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${wished ? "fill-white" : ""}`} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{seller}</p>
        <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <StarRating rating={rating} count={reviewCount} />
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-foreground">
              {currentPrice.toLocaleString("ar-EG")}{" "}
              {t(lang, "ج.م", "EGP")}
            </span>
            {oldPrice > currentPrice && (
              <span className="text-xs text-muted-foreground line-through me-2">
                {oldPrice.toLocaleString("ar-EG")}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              addedToCart
                ? "bg-emerald-500 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {addedToCart ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5" />
            )}
            {addedToCart
              ? t(lang, "تمت الإضافة", "Added!")
              : t(lang, "أضف", "Add")}
          </button>
        </div>
      </div>
    </div>
  );
}
