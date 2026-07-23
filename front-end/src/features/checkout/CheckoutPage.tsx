"use client";

import { useState } from "react";
import { MapPin, CreditCard, Check, Lock, Shield } from "lucide-react";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { products } from "@/lib/data";

export function CheckoutPage() {
  const { lang } = useAppContext();
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("card");

  const steps = [t(lang, "العنوان", "Address"), t(lang, "الدفع", "Payment"), t(lang, "المراجعة", "Review")];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black mb-8">{t(lang, "إتمام الطلب", "Checkout")}</h1>

      {/* Stepper */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${i + 1 < step ? "bg-emerald-500 text-white" : i + 1 === step ? "bg-primary text-primary-foreground ring-4 ring-primary/25" : "bg-muted text-muted-foreground"}`}>
                {i + 1 < step ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-xs mt-1.5 font-semibold ${i + 1 === step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-3 mb-4 transition-colors ${i + 1 < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
              <h2 className="font-black text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" />{t(lang, "عنوان الشحن", "Shipping Address")}</h2>
              <div className="grid grid-cols-2 gap-4">
                {[[t(lang, "الاسم الأول", "First Name"), "محمد"], [t(lang, "اسم العائلة", "Last Name"), "إبراهيم"]].map(([label, placeholder]) => (
                  <div key={label}>
                    <label className="text-sm font-semibold block mb-2">{label}</label>
                    <input defaultValue={placeholder} className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary focus:bg-background rounded-xl text-sm outline-none transition-colors" />
                  </div>
                ))}
              </div>
              {[[t(lang, "البريد الإلكتروني", "Email"), "m.ibrahim@email.com"], [t(lang, "رقم الهاتف", "Phone"), "+20 10 1234 5678"], [t(lang, "العنوان", "Address"), t(lang, "شارع التحرير، المهندسين", "Al-Tahrir St., Mohandeseen")]].map(([label, placeholder]) => (
                <div key={label}>
                  <label className="text-sm font-semibold block mb-2">{label}</label>
                  <input defaultValue={placeholder} className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary focus:bg-background rounded-xl text-sm outline-none transition-colors" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                {[[t(lang, "المدينة", "City"), t(lang, "القاهرة", "Cairo")], [t(lang, "الرمز البريدي", "Postal Code"), "11511"]].map(([label, placeholder]) => (
                  <div key={label}>
                    <label className="text-sm font-semibold block mb-2">{label}</label>
                    <input defaultValue={placeholder} className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary focus:bg-background rounded-xl text-sm outline-none transition-colors" />
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors mt-2">
                {t(lang, "متابعة إلى الدفع", "Continue to Payment")}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
              <h2 className="font-black text-lg flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" />{t(lang, "طريقة الدفع", "Payment Method")}</h2>
              <div className="space-y-3">
                {[
                  { id: "card", icon: "💳", label: t(lang, "بطاقة ائتمان / خصم", "Credit / Debit Card") },
                  { id: "instapay", icon: "📱", label: "InstaPay" },
                  { id: "vf", icon: "💰", label: t(lang, "فودافون كاش", "Vodafone Cash") },
                  { id: "cod", icon: "🏠", label: t(lang, "الدفع عند الاستلام", "Cash on Delivery") },
                ].map((m) => (
                  <label key={m.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${payMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${payMethod === m.id ? "border-primary" : "border-border"}`} onClick={() => setPayMethod(m.id)}>
                      {payMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="text-xl">{m.icon}</span>
                    <span className="font-semibold">{m.label}</span>
                  </label>
                ))}
              </div>
              {payMethod === "card" && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-sm font-semibold block mb-2">{t(lang, "رقم البطاقة", "Card Number")}</label>
                    <input placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary rounded-xl text-sm outline-none font-mono transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold block mb-2">{t(lang, "تاريخ الانتهاء", "Expiry Date")}</label>
                      <input placeholder="MM / YY" className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary rounded-xl text-sm outline-none font-mono transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-2">CVV</label>
                      <input placeholder="123" className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary rounded-xl text-sm outline-none font-mono transition-colors" />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-border py-4 rounded-2xl font-semibold hover:bg-muted transition-colors">{t(lang, "رجوع", "Back")}</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors">{t(lang, "مراجعة الطلب", "Review Order")}</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
              <h2 className="font-black text-lg">{t(lang, "مراجعة الطلب", "Review Order")}</h2>
              <div className="space-y-3">
                {products.slice(0, 2).map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 bg-muted rounded-2xl">
                    <img src={p.image} alt="" className="w-14 h-14 object-cover rounded-xl" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{lang === "ar" ? p.name : p.nameEn}</p>
                      <p className="text-xs text-muted-foreground">{t(lang, "الكمية: 1", "Qty: 1")}</p>
                    </div>
                    <span className="font-bold">{p.price.toLocaleString("ar-EG")} {t(lang, "ج.م", "EGP")}</span>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-sm">{t(lang, "✓ طلبك آمن ومضمون من سوقX", "✓ Your order is secured and guaranteed by SouqX")}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 border border-border py-4 rounded-2xl font-semibold hover:bg-muted transition-colors">{t(lang, "رجوع", "Back")}</button>
                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />{t(lang, "تأكيد الطلب", "Place Order")}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 h-fit space-y-4">
          <h3 className="font-bold">{t(lang, "ملخص الطلب", "Order Summary")}</h3>
          <div className="space-y-2 text-sm">
            {[[t(lang, "المجموع الفرعي", "Subtotal"), "8,598 ج.م"], [t(lang, "الشحن", "Shipping"), t(lang, "مجاني", "Free")], [t(lang, "الضريبة (14%)", "Tax (14%)"), "1,204 ج.م"]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-muted-foreground">
                <span>{k}</span>
                <span className={v === t(lang, "مجاني", "Free") ? "text-emerald-600 font-semibold" : ""}>{v}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between font-black text-lg">
              <span>{t(lang, "الإجمالي", "Total")}</span>
              <span className="text-primary">9,802 {t(lang, "ج.م", "EGP")}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            {t(lang, "مدفوعاتك محمية بتشفير SSL 256-bit", "Payments protected by 256-bit SSL encryption")}
          </div>
        </div>
      </div>
    </div>
  );
}
