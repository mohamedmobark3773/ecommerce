"use client";

import { useState } from "react";
import { Search, Download, Upload, Plus, Eye, Edit, Trash2, Camera, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { products, categories } from "@/lib/data";

export function ProductManagement() {
  const { lang } = useAppContext();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black">{t(lang, "إدارة المنتجات", "Product Management")}</h1>
          <p className="text-muted-foreground text-sm">{t(lang, "87 منتج نشط", "87 active products")}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />{t(lang, "تصدير", "Export")}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <Upload className="w-4 h-4" />{t(lang, "استيراد", "Import")}
          </button>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />{t(lang, "إضافة منتج", "Add Product")}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="w-full ps-10 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" placeholder={t(lang, "بحث في المنتجات...", "Search products...")} />
        </div>
        <select className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none">
          <option>{t(lang, "كل الفئات", "All Categories")}</option>
          {categories.map((c) => <option key={c.name}>{lang === "ar" ? c.name : c.nameEn}</option>)}
        </select>
        <select className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none">
          <option>{t(lang, "كل الحالات", "All Status")}</option>
          <option>{t(lang, "نشط", "Active")}</option>
          <option>{t(lang, "نفذ المخزون", "Out of Stock")}</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {[t(lang, "المنتج", "Product"), t(lang, "الفئة", "Category"), t(lang, "السعر", "Price"), t(lang, "المخزون", "Stock"), t(lang, "المبيعات", "Sales"), t(lang, "الحالة", "Status"), t(lang, "إجراءات", "Actions")].map((h) => (
                <th key={h} className="text-start px-5 py-4 text-xs font-bold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-11 h-11 rounded-xl object-cover bg-muted shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{lang === "ar" ? p.name : p.nameEn}</p>
                      <p className="text-xs text-muted-foreground">ID: {p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{p.category}</td>
                <td className="px-5 py-4 text-sm font-bold">{p.price.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</td>
                <td className="px-5 py-4"><span className={`text-sm font-semibold ${p.stock < 10 ? "text-amber-600" : "text-emerald-600"}`}>{p.stock}</span></td>
                <td className="px-5 py-4 text-sm">{p.reviews.toLocaleString("ar-EG")}</td>
                <td className="px-5 py-4"><Badge text={p.stock > 0 ? t(lang, "نشط", "Active") : t(lang, "نفذ", "Out of Stock")} variant={p.stock > 0 ? "success" : "danger"} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></button>
                    <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-primary"><Edit className="w-4 h-4" /></button>
                    <button className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
              <h2 className="font-black text-xl">{t(lang, "إضافة منتج جديد", "Add New Product")}</h2>
              <button onClick={() => setShowAdd(false)} className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Camera className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="font-semibold text-sm">{t(lang, "رفع صور المنتج", "Upload Product Images")}</p>
                <p className="text-xs text-muted-foreground mt-1">{t(lang, "PNG, JPG حتى 10MB", "PNG, JPG up to 10MB")}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[t(lang, "اسم المنتج (عربي)", "Product Name (Arabic)"), t(lang, "اسم المنتج (إنجليزي)", "Product Name (English)")].map((l) => (
                  <div key={l}>
                    <label className="text-sm font-semibold block mb-2">{l}</label>
                    <input className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-colors" placeholder={l} />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">{t(lang, "الوصف", "Description")}</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary rounded-xl text-sm outline-none resize-none transition-colors" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[t(lang, "السعر", "Price"), t(lang, "السعر الأصلي", "Original Price"), t(lang, "المخزون", "Stock")].map((l) => (
                  <div key={l}>
                    <label className="text-sm font-semibold block mb-2">{l}</label>
                    <input type="number" className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-colors" />
                  </div>
                ))}
              </div>
              <select className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-colors">
                <option>{t(lang, "اختر الفئة", "Select Category")}</option>
                {categories.map((c) => <option key={c.name}>{lang === "ar" ? c.name : c.nameEn}</option>)}
              </select>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="flex-1 border border-border py-3 rounded-2xl font-semibold hover:bg-muted transition-colors">{t(lang, "إلغاء", "Cancel")}</button>
                <button onClick={() => setShowAdd(false)} className="flex-1 bg-primary text-primary-foreground py-3 rounded-2xl font-bold hover:bg-primary/90 transition-colors">{t(lang, "حفظ المنتج", "Save Product")}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
