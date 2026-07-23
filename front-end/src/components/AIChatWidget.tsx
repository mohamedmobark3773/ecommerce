"use client";

import { useState } from "react";
import { X, Bot, Sparkles, Send } from "lucide-react";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";

export function AIChatWidget() {
  const { lang } = useAppContext();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      from: "bot",
      text: t(
        lang,
        "مرحباً! أنا مساعد سوقX الذكي. كيف يمكنني مساعدتك اليوم؟ 😊",
        "Hello! I'm SouqX AI assistant. How can I help you today? 😊"
      ),
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const q = input;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: t(
            lang,
            `شكراً لسؤالك! يمكنني مساعدتك في "${q}". هل تريد تصفح منتجاتنا؟`,
            `Thanks for asking about "${q}"! Can I help you browse our products?`
          ),
        },
      ]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 end-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -end-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
        )}
      </button>
      {open && (
        <div
          className="fixed bottom-24 end-6 z-50 w-80 bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          style={{ height: 420 }}
        >
          <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <p className="font-bold text-sm">
                {t(lang, "مساعد سوقX الذكي", "SouqX AI Assistant")}
              </p>
              <p className="text-xs text-white/70">
                {t(lang, "متاح دائماً", "Always available")}
              </p>
            </div>
            <div className="ms-auto w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.from === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center me-2 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-primary text-primary-foreground rounded-se-sm"
                      : "bg-muted rounded-ss-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="flex-1 px-4 py-2.5 bg-muted rounded-xl text-sm outline-none"
                placeholder={t(lang, "اكتب رسالتك...", "Type your message...")}
              />
              <button
                onClick={send}
                className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
