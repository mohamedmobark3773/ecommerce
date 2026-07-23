"use client";

import { useState, useEffect } from "react";
import {
  Truck, Shield, RotateCcw, Award, Zap, Clock, ArrowLeft, ArrowRight,
  Sparkles, Mail, CheckCircle, Star,
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { StarRating } from "@/components/ui/StarRating";
import { useNavigate } from "@/hooks/useNavigate";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { products, categories, reviews } from "@/lib/data";

export function HomePage() {
  const { lang } = useAppContext();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flashTime, setFlashTime] = useState(3600 * 4);

  useEffect(() => {
    const timer = setInterval(() => setFlashTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600),
      m = Math.floor((s % 3600) / 60),
      sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const slides = [
    { bg: "from-[#0f172a] to-[#1e3a8a]", tag: t(lang, "عرض حصري", "Exclusive Deal"), title: t(lang, "آيفون 15 برو ماكس", "iPhone 15 Pro Max"), sub: t(lang, "خصم يصل إلى 15% على أحدث إصدار", "Up to 15% off the latest release"), cta: t(lang, "تسوق الآن", "Shop Now"), img: "https://images.unsplash.com/photo-1696446702183-cbd60c3b01f5?w=600&h=400&fit=crop&auto=format" },
    { bg: "from-[#134e4a] to-[#0f172a]", tag: t(lang, "جديد", "New Arrival"), title: t(lang, "ماك بوك برو 14", "MacBook Pro 14"), sub: t(lang, "أداء استثنائي بشريحة M3 Pro", "Exceptional performance with M3 Pro"), cta: t(lang, "اكتشف المزيد", "Discover More"), img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop&auto=format" },
    { bg: "from-[#312e81] to-[#0f172a]", tag: t(lang, "الأكثر مبيعاً", "Best Seller"), title: t(lang, "سوني WH-1000XM5", "Sony WH-1000XM5"), sub: t(lang, "أفضل سماعات عزل ضوضاء في العالم", "World's best noise-canceling headphones"), cta: t(lang, "تسوق الآن", "Shop Now"), img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&auto=format" },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className={`bg-gradient-to-r ${slides[currentSlide].bg} min-h-[480px] md:min-h-[560px] flex items-center transition-all duration-700`}>
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full grid md:grid-cols-2 gap-8 items-center py-12 md:py-16">
            <div className="space-y-6 text-white">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                {slides[currentSlide].tag}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">{slides[currentSlide].title}</h1>
              <p className="text-lg text-white/80 font-medium">{slides[currentSlide].sub}</p>
              <div className="flex items-center gap-4">
                <button onClick={() => navigate("product")} className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-lg">
                  {slides[currentSlide].cta}
                  {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
                <button onClick={() => navigate("shop")} className="text-white/80 hover:text-white font-semibold underline underline-offset-4 transition-colors">
                  {t(lang, "تصفح الكل", "Browse All")}
                </button>
              </div>
              <div className="flex items-center gap-6 pt-2">
                {[{ n: "150K+", l: t(lang, "منتج", "Products") }, { n: "4.8⭐", l: t(lang, "تقييم", "Rating") }, { n: "2M+", l: t(lang, "عميل", "Customers") }].map((s) => (
                  <div key={s.l}><div className="text-xl font-black">{s.n}</div><div className="text-xs text-white/60">{s.l}</div></div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl transform scale-110" />
                <img src={slides[currentSlide].img} alt="hero product" className="relative w-80 h-80 object-cover rounded-3xl shadow-2xl border border-white/20" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`transition-all duration-300 rounded-full ${i === currentSlide ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-14">
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: t(lang, "شحن سريع", "Fast Shipping"), sub: t(lang, "توصيل خلال 24-48 ساعة", "Delivery in 24-48h"), color: "#2563eb" },
            { icon: Shield, title: t(lang, "دفع آمن 100%", "100% Secure Pay"), sub: t(lang, "تشفير SSL معتمد", "SSL certified encryption"), color: "#10b981" },
            { icon: RotateCcw, title: t(lang, "إرجاع مجاني", "Free Returns"), sub: t(lang, "إرجاع خلال 30 يوم", "Return within 30 days"), color: "#f59e0b" },
            { icon: Award, title: t(lang, "ضمان الجودة", "Quality Guarantee"), sub: t(lang, "منتجات أصلية 100%", "100% genuine products"), color: "#8b5cf6" },
          ].map(({ icon: Icon, title, sub, color }) => (
            <div key={title} className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div><p className="font-bold text-sm">{title}</p><p className="text-xs text-muted-foreground">{sub}</p></div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black">{t(lang, "تسوق حسب الفئة", "Shop by Category")}</h2>
              <p className="text-muted-foreground text-sm mt-1">{t(lang, "اكتشف أكثر من 150 ألف منتج", "Discover 150K+ products")}</p>
            </div>
            <button onClick={() => navigate("shop")} className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              {t(lang, "عرض الكل", "View All")}
              {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <button key={cat.name} onClick={() => navigate("shop")} className="group flex flex-col items-center gap-3 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform" style={{ background: `${cat.color}15` }}>
                  {cat.icon}
                </div>
                <div className="text-center">
                  <p className="font-bold text-xs">{lang === "ar" ? cat.name : cat.nameEn}</p>
                  <p className="text-[10px] text-muted-foreground">{cat.count.toLocaleString("ar-EG")}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Flash Sale */}
        <section className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-6 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-7 h-7 text-yellow-300 fill-yellow-300" />
                  <h2 className="text-2xl font-black text-white">{t(lang, "فلاش سيل", "Flash Sale")}</h2>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="font-mono font-black text-white text-lg tracking-wider">{formatTime(flashTime)}</span>
                </div>
              </div>
              <button onClick={() => navigate("shop")} className="self-start md:self-auto flex items-center gap-2 bg-white text-red-600 font-bold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors text-sm">
                {t(lang, "عرض جميع العروض", "View All Deals")}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((p) => (
                <button key={p.id} onClick={() => navigate("product")} className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all text-start">
                  <img src={p.image} alt="" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-3">
                    <p className="text-white text-xs font-semibold line-clamp-1">{lang === "ar" ? p.name : p.nameEn}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-white font-black text-sm">{p.price.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
                      <span className="bg-yellow-400 text-red-700 text-[10px] font-black px-1.5 py-0.5 rounded-lg">
                        -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black">{t(lang, "الأكثر مبيعاً", "Best Sellers")}</h2>
              <p className="text-muted-foreground text-sm mt-1">{t(lang, "الأكثر طلباً هذا الأسبوع", "Most ordered this week")}</p>
            </div>
            <button onClick={() => navigate("shop")} className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              {t(lang, "عرض الكل", "View All")}
              {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Promo banners */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute -top-6 -end-6 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -start-4 w-24 h-24 bg-white/5 rounded-full" />
            <div className="relative">
              <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">{t(lang, "تطبيق الجوال", "Mobile App")}</span>
              <h3 className="text-2xl font-black mt-3 mb-2">{t(lang, "حمّل التطبيق", "Download the App")}</h3>
              <p className="text-white/80 text-sm mb-6">{t(lang, "احصل على خصم 10% على أول طلب من التطبيق", "Get 10% off your first app order")}</p>
              <div className="flex gap-3">
                <button className="bg-white text-primary text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white/90 transition-colors">App Store</button>
                <button className="bg-white text-primary text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white/90 transition-colors">Google Play</button>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute -top-6 -end-6 w-32 h-32 bg-primary/20 rounded-full" />
            <div className="relative">
              <span className="text-xs font-bold bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">{t(lang, "بيع على سوقX", "Sell on SouqX")}</span>
              <h3 className="text-2xl font-black mt-3 mb-2">{t(lang, "ابدأ البيع اليوم", "Start Selling Today")}</h3>
              <p className="text-white/60 text-sm mb-6">{t(lang, "انضم لأكثر من 50,000 بائع ناجح", "Join 50,000+ successful sellers")}</p>
              <button onClick={() => navigate("seller")} className="flex items-center gap-2 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
                {t(lang, "ابدأ مجاناً", "Start for Free")}
                {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <section className="bg-gradient-to-r from-violet-600/10 to-cyan-600/10 border border-violet-500/20 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-violet-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h2 className="font-black text-lg">{t(lang, "توصيات الذكاء الاصطناعي", "AI Recommendations")}</h2>
              <p className="text-xs text-muted-foreground">{t(lang, "اختيرت خصيصاً لك بناءً على اهتماماتك", "Specially picked for you based on your interests")}</p>
            </div>
            <span className="ms-auto text-xs bg-violet-500/20 text-violet-600 dark:text-violet-400 font-semibold px-3 py-1 rounded-full border border-violet-500/20">
              ✨ {t(lang, "مدعوم بالذكاء الاصطناعي", "AI Powered")}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.slice(4, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black">{t(lang, "ماذا يقول عملاؤنا", "What Our Customers Say")}</h2>
            <p className="text-muted-foreground mt-2">{t(lang, "أكثر من 2 مليون عميل راضٍ", "Over 2 million satisfied customers")}</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}</div>
              <span className="font-bold text-lg">4.9</span>
              <span className="text-muted-foreground text-sm">{t(lang, "من 847,000 تقييم", "from 847K reviews")}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shrink-0">{r.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{r.name}</p>
                      {r.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <StarRating rating={r.rating} />
                <p className="text-sm text-foreground/80 mt-3 leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-3">{t(lang, "اشترك في النشرة البريدية", "Subscribe to Newsletter")}</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t(lang, "احصل على أفضل العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني", "Get the best deals and new products directly in your inbox")}</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input className="flex-1 px-5 py-3 bg-card border border-border rounded-2xl text-sm outline-none focus:border-primary transition-colors" placeholder={t(lang, "بريدك الإلكتروني", "Your email address")} />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-bold text-sm hover:bg-primary/90 transition-colors whitespace-nowrap">
              {t(lang, "اشتراك مجاني", "Subscribe Free")}
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-2xl"><span className="text-primary">سوق</span>X</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{t(lang, "منصة التجارة الإلكترونية الرائدة في منطقة الشرق الأوسط وشمال أفريقيا.", "The leading e-commerce platform in MENA.")}</p>
              <div className="flex gap-3">
                {["𝕏", "ف", "إ", "ل"].map((icon, i) => (
                  <div key={i} className="w-9 h-9 bg-white/10 hover:bg-primary rounded-xl flex items-center justify-center cursor-pointer transition-colors text-sm font-bold">{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title: t(lang, "المتجر", "Store"), links: [t(lang, "الإلكترونيات", "Electronics"), t(lang, "الحواسيب", "Computers"), t(lang, "الساعات", "Watches"), t(lang, "الصوتيات", "Audio")] },
              { title: t(lang, "الدعم", "Support"), links: [t(lang, "مركز المساعدة", "Help Center"), t(lang, "تتبع الطلب", "Track Order"), t(lang, "الإرجاع والاسترداد", "Returns"), t(lang, "تواصل معنا", "Contact Us")] },
              { title: t(lang, "الشركة", "Company"), links: [t(lang, "من نحن", "About Us"), t(lang, "وظائف", "Careers"), t(lang, "اضغط", "Press"), t(lang, "المدونة", "Blog")] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold mb-4 text-white">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => <li key={l}><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">© 2024 SouqX. {t(lang, "جميع الحقوق محفوظة", "All rights reserved.")}</p>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {["💳", "🏦", "📱"].map((p, i) => <span key={i} className="w-10 h-6 bg-white/10 rounded-lg flex items-center justify-center text-xs">{p}</span>)}
              </div>
              <span className="text-white/50 text-xs">{t(lang, "مدفوعات آمنة", "Secure Payments")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
