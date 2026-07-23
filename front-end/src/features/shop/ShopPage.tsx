"use client";

import { useMemo, useState } from "react";
import { Grid, List, Filter, Search, Star, ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ui/ProductCard";
import { StarRating } from "@/components/ui/StarRating";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { categoryService } from "@/services/category.service";
import { brandService } from "@/services/brand.service";
import { attributeService } from "@/services/attribute.service";
import { productService } from "@/services/product.service";
import { queryKeys } from "@/constants/queryKeys";
import type { Category, Brand, Attribute, Product as CatalogProduct } from "@/types";

export function ShopPage() {
  const { lang } = useAppContext();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleCat = (c: string) =>
    setSelectedCats((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  const toggleBrand = (b: string) =>
    setSelectedBrands((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]));

  const toggleAttr = (a: string) =>
    setSelectedAttrs((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));

  const filters = useMemo(() => ({
    search,
    page: String(page),
    limit: "12",
    sort,
    minPrice: String(priceRange[0]),
    maxPrice: String(priceRange[1]),
    category: selectedCats[0],
    brand: selectedBrands[0],
  }), [page, priceRange, search, selectedBrands, selectedCats, sort]);

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: queryKeys.categories.list({}),
    queryFn: () => categoryService.list({ limit: 100 }),
  });

  const { data: brandsData, isLoading: brandsLoading } = useQuery({
    queryKey: queryKeys.brands.list({}),
    queryFn: () => brandService.list({ limit: 100 }),
  });

  const { data: attributesData, isLoading: attributesLoading } = useQuery({
    queryKey: queryKeys.attributes.list({}),
    queryFn: () => attributeService.list({ limit: 100 }),
  });

  const { data: productsData, isLoading: productsLoading, isError: productsError } = useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.list(filters),
  });

  const categories = useMemo(() => categoriesData?.data?.categories ?? [], [categoriesData]);
  const brands = useMemo(() => brandsData?.data?.brands ?? [], [brandsData]);
  const attributes = useMemo(() => attributesData?.data?.attributes ?? [], [attributesData]);
  const products = useMemo(() => productsData?.data?.products ?? [], [productsData]);
  const pagination = productsData?.data?.pagination;
  const visibleProducts = useMemo(() => {
    if (!selectedAttrs.length) return products;
    return products.filter((product) => selectedAttrs.some((selectedAttributeId) =>
      product.attributes?.some((attr) => attr.attributeId === selectedAttributeId)
    ));
  }, [products, selectedAttrs]);
  const total = pagination?.total ?? 0;
  const pageCount = pagination?.pages ?? 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">{t(lang, "الرئيسية", "Home")}</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-foreground font-semibold">{t(lang, "المتجر", "Shop")}</span>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`shrink-0 w-72 space-y-6 ${filterOpen ? "block" : "hidden md:block"}`}>
          <div className="bg-card border border-border rounded-2xl p-5 space-y-6">
            <h3 className="font-black text-lg">{t(lang, "الفئات", "Categories")}</h3>
            <div className="space-y-2">
              {categoriesLoading ? (
                <p className="text-sm text-muted-foreground">{t(lang, "جارِ التحميل...", "Loading...")}</p>
              ) : categories.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t(lang, "لا توجد فئات", "No categories found")}</p>
              ) : (
                categories.map((cat: Category) => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedCats.includes(cat.id) ? "bg-primary border-primary" : "border-border group-hover:border-primary/50"}`}
                      onClick={() => toggleCat(cat.id)}
                    >
                      {selectedCats.includes(cat.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm flex-1">{cat.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-black text-lg">{t(lang, "نطاق السعر", "Price Range")}</h3>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{priceRange[0].toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
              <span>{priceRange[1].toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
            </div>
            <input type="range" min="0" max="10000" value={priceRange[1]} onChange={(e) => setPriceRange([0, +e.target.value])} className="w-full accent-primary" />
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-black text-lg">{t(lang, "التقييم", "Rating")}</h3>
            {[5, 4, 3, 2, 1].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded-full border-2 border-border group-hover:border-primary transition-colors" />
                <div className="flex">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`w-3.5 h-3.5 ${s <= r ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/20"}`} />)}</div>
                <span className="text-xs text-muted-foreground">{t(lang, "وأعلى", "& up")}</span>
              </label>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            <h3 className="font-black text-lg">{t(lang, "العلامة التجارية", "Brand")}</h3>
            {brandsLoading ? (
              <p className="text-sm text-muted-foreground">{t(lang, "جارِ التحميل...", "Loading...")}</p>
            ) : brands.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t(lang, "لا توجد علامات تجارية", "No brands found")}</p>
            ) : (
              brands.map((brand: Brand) => (
                <label key={brand.id} className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${selectedBrands.includes(brand.id) ? "bg-primary border-primary" : "border-border hover:border-primary/50"}`}
                    onClick={() => toggleBrand(brand.id)}
                  >
                    {selectedBrands.includes(brand.id) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm">{brand.name}</span>
                </label>
              ))
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-black text-lg">{t(lang, "السمات", "Attributes")}</h3>
            {attributesLoading ? (
              <p className="text-sm text-muted-foreground">{t(lang, "جارِ التحميل...", "Loading...")}</p>
            ) : attributes.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t(lang, "لا توجد سمات", "No attributes found")}</p>
            ) : (
              attributes.map((attribute: Attribute) => (
                <label key={attribute.id} className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${selectedAttrs.includes(attribute.id) ? "bg-primary border-primary" : "border-border hover:border-primary/50"}`}
                    onClick={() => toggleAttr(attribute.id)}
                  >
                    {selectedAttrs.includes(attribute.id) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm">{attribute.name}</span>
                </label>
              ))
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black">{t(lang, "جميع المنتجات", "All Products")}</h1>
              <p className="text-muted-foreground text-sm">
                {productsLoading
                  ? t(lang, "جارِ التحميل...", "Loading...")
                  : t(lang, `عرض ${visibleProducts.length} من ${total} منتج`, `Showing ${visibleProducts.length} of ${total} products`)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t(lang, "ابحث عن منتج...", "Search products...")}
                  className="pl-9 pr-3 py-2 bg-card border border-border rounded-xl text-sm outline-none"
                />
              </div>
              <button onClick={() => setFilterOpen(!filterOpen)} className="md:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-semibold">
                <Filter className="w-4 h-4" /> {t(lang, "فلاتر", "Filters")}
              </button>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium outline-none cursor-pointer">
                <option value="popular">{t(lang, "الأكثر شعبية", "Most Popular")}</option>
                <option value="price_asc">{t(lang, "السعر: من الأقل", "Price: Low to High")}</option>
                <option value="price_desc">{t(lang, "السعر: من الأعلى", "Price: High to Low")}</option>
                <option value="newest">{t(lang, "الأحدث", "Newest")}</option>
                <option value="rating">{t(lang, "الأعلى تقييماً", "Highest Rated")}</option>
              </select>
              <div className="flex bg-muted rounded-xl p-1">
                <button onClick={() => setView("grid")} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${view === "grid" ? "bg-card shadow-sm" : "hover:bg-card/50"}`}>
                  <Grid className="w-4 h-4" />
                </button>
                <button onClick={() => setView("list")} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${view === "list" ? "bg-card shadow-sm" : "hover:bg-card/50"}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className={view === "grid" ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-4"}>
            {productsLoading ? (
              <div className="col-span-full py-16 text-center text-muted-foreground">
                {t(lang, "جارِ تحميل المنتجات...", "Loading products...")}
              </div>
            ) : productsError ? (
              <div className="col-span-full py-16 text-center text-red-500">
                {t(lang, "تعذر تحميل المنتجات. حاول مرة أخرى.", "Could not load products. Please try again.")}
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="col-span-full py-16 text-center text-muted-foreground">
                {t(lang, "لا توجد منتجات تطابق الفلاتر الحالية.", "No products match the current filters.")}
              </div>
            ) : (
              visibleProducts.map((p: CatalogProduct) =>
                view === "grid" ? (
                  <ProductCard key={p.id} product={p as never} />
                ) : (
                  <Link key={p.id} href="/product" className="flex gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-md cursor-pointer transition-all">
                    <img src={p.images?.[0] ?? ""} alt="" className="w-28 h-28 object-cover rounded-xl shrink-0 bg-muted" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{typeof p.brand === 'object' && p.brand ? p.brand.name : ""}</p>
                      <h3 className="font-bold mt-0.5 mb-2">{p.name}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-black text-primary">{(p.price ?? 0).toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
                        <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors">
                          <ShoppingCart className="w-4 h-4" /> {t(lang, "أضف للسلة", "Add to Cart")}
                        </button>
                      </div>
                    </div>
                  </Link>
                )
              )
            )}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="w-10 h-10 rounded-xl border border-border hover:bg-muted flex items-center justify-center transition-colors"
              >
                {lang === "ar" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              {Array.from({ length: Math.min(pageCount, 5) }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${pageNumber === page ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {pageCount > 5 && <span className="text-muted-foreground px-2">...</span>}
              {pageCount > 5 && (
                <button
                  onClick={() => setPage(pageCount)}
                  className="w-10 h-10 rounded-xl border border-border text-sm font-semibold hover:bg-muted"
                >
                  {pageCount}
                </button>
              )}
              <button
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                className="w-10 h-10 rounded-xl border border-border hover:bg-muted flex items-center justify-center transition-colors"
              >
                {lang === "ar" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
