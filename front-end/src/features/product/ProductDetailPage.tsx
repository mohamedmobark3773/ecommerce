"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle,
  ThumbsUp,
  Flag,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCard } from "@/components/ui/ProductCard";
import { useNavigate } from "@/hooks/useNavigate";
import { useAppContext } from "@/store/AppContext";
import { useAppSelector } from "@/store/hooks";
import { t } from "@/lib/i18n";
import { productService } from "@/services/product.service";
import { reviewService } from "@/services/review.service";
import { attributeService } from "@/services/attribute.service";
import { queryKeys } from "@/constants/queryKeys";
import type { Attribute, Review } from "@/types";

export function ProductDetailPage() {
  const { lang } = useAppContext();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const authState = useAppSelector((state) => state.auth);
  const productId = searchParams.get("productId") ?? "";
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [wished, setWished] = useState(false);
  const [tab, setTab] = useState("description");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  const { data: productResponse, isLoading: productLoading, isError: productError } = useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => productService.getById(productId),
    enabled: Boolean(productId),
  });

  const product = productResponse?.data ?? null;
  const productCategoryId = typeof product?.category === "string" ? product.category : product?.category?.id;
  const productBrandId = typeof product?.brand === "string" ? product.brand : product?.brand?.id;

  const { data: attributesResponse } = useQuery({
    queryKey: queryKeys.attributes.list({}),
    queryFn: () => attributeService.list({ limit: 100 }),
  });

  const { data: reviewsResponse, isLoading: reviewsLoading } = useQuery({
    queryKey: queryKeys.reviews.list({ product: productId, page: 1, limit: 20 }),
    queryFn: () => reviewService.list({ product: productId, page: 1, limit: 20 }),
    enabled: Boolean(productId),
  });

  const { data: relatedResponse } = useQuery({
    queryKey: queryKeys.products.list({ category: productCategoryId, brand: productBrandId, limit: 4 }),
    queryFn: () => productService.list({ category: productCategoryId, brand: productBrandId, limit: 4 }),
    enabled: Boolean(productCategoryId) || Boolean(productBrandId),
  });

  const relatedProducts = useMemo(
    () => relatedResponse?.data?.products?.filter((item) => item.id !== product?.id) ?? [],
    [product?.id, relatedResponse],
  );

  const reviews = useMemo(() => reviewsResponse?.data?.reviews ?? [], [reviewsResponse]);
  const attributes = useMemo(() => attributesResponse?.data?.attributes ?? [], [attributesResponse]);
  const galleryImages = useMemo(() => {
    if (Array.isArray(product?.images) && product.images.length > 0) return product.images;
    return ["https://images.unsplash.com/photo-1696446702183-cbd60c3b01f5?w=800&h=800&fit=crop&auto=format"];
  }, [product?.images]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, review) => sum + Number(review.rating ?? 0), 0);
    return Number((total / reviews.length).toFixed(1));
  }, [reviews]);

  const reviewDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const rating = Number(review.rating ?? 0);
      if (rating >= 1 && rating <= 5) distribution[rating as keyof typeof distribution] += 1;
    });

    const total = Math.max(reviews.length, 1);
    return [5, 4, 3, 2, 1].map((value) => ({
      value,
      count: distribution[value as keyof typeof distribution],
      percent: Math.round((distribution[value as keyof typeof distribution] / total) * 100),
    }));
  }, [reviews]);

  const productBrandName =
    typeof product?.brand === "object" && product?.brand
      ? product.brand.name
      : typeof product?.brand === "string"
        ? product.brand
        : "";

  const productCategoryName =
    typeof product?.category === "object" && product?.category
      ? product.category.name
      : typeof product?.category === "string"
        ? product.category
        : "";

  const productAttributes = (product?.attributes ?? []).map((attribute) => {
    const found = attributes.find((item: Attribute) => item.id === attribute.attributeId);
    return {
      name: found?.name ?? attribute.attributeId ?? "Attribute",
      value: attribute.value ?? "",
    };
  });

  const reviewCount = reviewsResponse?.data?.pagination?.total ?? reviews.length;

  const handleCreateReview = async () => {
    if (!authState.isAuthenticated || !productId) return;
    if (!newReviewComment.trim()) return;

    await reviewService.create({
      product: productId,
      user: authState.user?.id,
      rating: Number(newReviewRating),
      title: `Review for ${product?.name ?? productId}`,
      comment: newReviewComment,
    });

    setNewReviewComment("");
    setNewReviewRating(5);
    await queryClient.invalidateQueries({ queryKey: queryKeys.reviews.list({ product: productId }) });
  };

  if (productLoading) {
    return <div className="max-w-7xl mx-auto px-4 py-8 text-muted-foreground">{t(lang, "جارِ التحميل...", "Loading...")}</div>;
  }

  if (productError || !product) {
    return <div className="max-w-7xl mx-auto px-4 py-8 text-center text-red-500">{t(lang, "تعذر تحميل المنتج.", "Could not load product.")}</div>;
  }

  const discount = product.compareAtPrice && product.compareAtPrice > (product.price ?? 0)
    ? Math.round(((product.compareAtPrice - (product.price ?? 0)) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">{t(lang, "الرئيسية", "Home")}</Link>
        <ChevronLeft className="w-4 h-4" />
        <Link href="/shop" className="hover:text-primary">{t(lang, "المتجر", "Shop")}</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-3xl overflow-hidden border border-border">
            <img src={galleryImages[selectedImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <button key={i} onClick={() => setSelectedImg(i)} className={`aspect-square bg-muted rounded-2xl overflow-hidden border-2 transition-all ${i === selectedImg ? "border-primary" : "border-transparent hover:border-primary/40"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.isFeatured && <Badge text={t(lang, "الأكثر مبيعاً", "Best Seller")} />}
              <Badge text={product.stock && product.stock > 0 ? t(lang, "متوفر", "In Stock") : t(lang, "غير متوفر", "Out of Stock")} variant={product.stock && product.stock > 0 ? "success" : "default"} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black leading-tight mb-3">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{t(lang, "العلامة التجارية:", "Brand:")} <span className="text-primary font-semibold">{productBrandName || "-"}</span></p>
            <p className="text-sm text-muted-foreground mt-1">{t(lang, "الفئة:", "Category:")} <span className="text-primary font-semibold">{productCategoryName || "-"}</span></p>
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={averageRating || 0} count={reviewCount} size="md" />
              <button type="button" onClick={() => setTab("reviews")} className="text-sm text-primary font-semibold cursor-pointer">{t(lang, "عرض التقييمات", "View reviews")}</button>
            </div>
          </div>

          <div className="bg-muted/50 rounded-2xl p-5">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-primary">{(product.price ?? 0).toLocaleString("ar-EG")}</span>
              <span className="text-xl font-semibold text-muted-foreground mb-1">{t(lang, "ج.م", "EGP")}</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center gap-3 mt-2">
                <span className="text-base text-muted-foreground line-through">{(product.compareAtPrice ?? product.price ?? 0).toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
                <span className="bg-red-500/10 text-red-500 text-sm font-bold px-2.5 py-1 rounded-lg">
                  {t(lang, "وفر", "Save")} {discount}%
                </span>
              </div>
            )}
          </div>

          {productAttributes.length > 0 && (
            <div>
              <p className="font-semibold mb-3">{t(lang, "المواصفات:", "Attributes:")}</p>
              <div className="flex gap-2 flex-wrap">
                {productAttributes.map((item) => (
                  <span key={`${item.name}-${item.value}`} className="px-3 py-1.5 rounded-full bg-muted text-sm">{item.name}: {item.value}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center bg-muted rounded-2xl overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-border transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-lg">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock ?? 0, q + 1))} className="w-12 h-12 flex items-center justify-center hover:bg-border transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button onClick={() => navigate("cart")} className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25">
              <ShoppingCart className="w-5 h-5" />
              {t(lang, "أضف إلى السلة", "Add to Cart")}
            </button>
            <button onClick={() => setWished(!wished)} className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${wished ? "bg-red-50 border-red-300 text-red-500" : "border-border hover:border-red-300"}`}>
              <Heart className={`w-5 h-5 ${wished ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>

          <button onClick={() => navigate("checkout")} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3.5 rounded-2xl hover:opacity-90 transition-opacity">
            {t(lang, "اشتر الآن", "Buy Now")}
          </button>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: Shield, text: t(lang, "دفع آمن", "Secure Payment") },
              { icon: Truck, text: t(lang, "توصيل مجاني", "Free Delivery") },
              { icon: RotateCcw, text: t(lang, "إرجاع 30 يوم", "30-Day Return") },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-2xl text-center">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-border mb-8">
        <div className="flex gap-1">
          {[
            ["description", t(lang, "الوصف", "Description")],
            ["specs", t(lang, "المواصفات", "Specifications")],
            ["reviews", t(lang, `التقييمات (${reviewCount})`, `Reviews (${reviewCount})`)],
          ].map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)} className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${tab === v ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
      </div>

      {tab === "description" && (
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-black mb-4">{t(lang, "وصف المنتج", "Product Description")}</h3>
          <p className="text-foreground/80 leading-relaxed">{product.description}</p>
        </div>
      )}

      {tab === "specs" && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
          <table className="w-full">
            <tbody>
              {[
                [t(lang, "الفئة", "Category"), productCategoryName || "-"],
                [t(lang, "العلامة التجارية", "Brand"), productBrandName || "-"],
                [t(lang, "الكمية المتاحة", "Available Stock"), String(product.stock ?? 0)],
                [t(lang, "SKU", "SKU"), product.sku ?? "-"],
                [t(lang, "الحالة", "Status"), product.status ?? "-"],
              ].map(([k, v], i) => (
                <tr key={k} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="px-6 py-4 font-semibold text-sm w-48">{k}</td>
                  <td className="px-6 py-4 text-sm text-foreground/80">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-6 mb-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-6xl font-black text-primary">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mt-2">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}</div>
                <div className="text-sm text-muted-foreground mt-1">{reviewCount.toLocaleString("ar-EG")} {t(lang, "تقييم", "reviews")}</div>
              </div>
              <div className="flex-1 space-y-2">
                {reviewDistribution.map((item) => (
                  <div key={item.value} className="flex items-center gap-3 text-sm">
                    <span className="w-4 text-end">{item.value}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className="text-muted-foreground w-8">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {authState.isAuthenticated ? (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black">{t(lang, "أضف تقييمك", "Write your review")}</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button key={rating} onClick={() => setNewReviewRating(rating)} className={`w-8 h-8 rounded-full border ${rating <= newReviewRating ? "bg-amber-400 text-white border-amber-400" : "border-border"}`}>{rating}</button>
                ))}
              </div>
              <textarea value={newReviewComment} onChange={(e) => setNewReviewComment(e.target.value)} className="w-full min-h-28 rounded-2xl border border-border bg-background px-4 py-3 text-sm" placeholder={t(lang, "اكتب رأيك عن المنتج...", "Write your review...")} />
              <button onClick={handleCreateReview} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold">{t(lang, "إرسال", "Submit")}</button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6 text-sm text-muted-foreground">
              {t(lang, "سجل الدخول لإضافة مراجعة.", "Sign in to add a review.")}
            </div>
          )}

          {reviewsLoading ? (
            <div className="text-muted-foreground">{t(lang, "جارِ تحميل التقييمات...", "Loading reviews...")}</div>
          ) : reviews.length === 0 ? (
            <div className="text-muted-foreground">{t(lang, "لا توجد مراجعات حتى الآن.", "No reviews yet.")}</div>
          ) : (
            reviews.map((review: Review) => {
              const userName = typeof review.user === "object" && review.user ? (review.user.fullName ?? review.user.name ?? review.user.email ?? "User") : "User";
              const reviewDate = review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-GB") : "";
              return (
                <div key={review.id} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shrink-0">{userName.charAt(0).toUpperCase()}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{userName}</span>
                        {review.isApproved && <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" />{t(lang, "شراء موثق", "Verified Purchase")}</span>}
                        <span className="text-xs text-muted-foreground ms-auto">{reviewDate}</span>
                      </div>
                      <StarRating rating={Number(review.rating ?? 0)} />
                      <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{review.comment || review.title || ""}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"><ThumbsUp className="w-3.5 h-3.5" />{t(lang, "مفيد (24)", "Helpful (24)")}</button>
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"><Flag className="w-3.5 h-3.5" />{t(lang, "إبلاغ", "Report")}</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <section>
        <h2 className="text-2xl font-black mb-6">{t(lang, "منتجات مشابهة", "Related Products")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedProducts.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </div>
  );
}
