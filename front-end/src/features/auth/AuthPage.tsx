"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Mail, User, Lock, Eye, EyeOff, Zap, Sun, Moon, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "@/hooks/useNavigate";
import { useAppContext } from "@/store/AppContext";
import { t } from "@/lib/i18n";
import { authService } from "@/services/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { setAuthUser } from "@/store/slices/authSlice";
import { setStorageItem } from "@/utils/storage";
import { storageKeys } from "@/constants/storageKeys";

export function AuthPage({ type }: { type: "login" | "register" | "forgot" }) {
  const { lang, setLang } = useAppContext();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const isForgot = type === "forgot";

  const getRegisterPasswordError = (password: string) => {
    if (password.length < 8) return t(lang, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل", "Password must be at least 8 characters long");
    if (!/[A-Z]/.test(password)) return t(lang, "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل", "Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) return t(lang, "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل", "Password must contain at least one lowercase letter");
    if (!/[0-9]/.test(password)) return t(lang, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل", "Password must contain at least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return t(lang, "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل", "Password must contain at least one special character");
    return null;
  };

  const getRegisterFullNameError = (fullName: string) => {
    const trimmed = fullName.trim();
    if (trimmed.length < 2) return t(lang, "يجب أن يكون الاسم الكامل حرفين على الأقل", "Full name must be at least 2 characters long");
    if (trimmed.length > 100) return t(lang, "يجب ألا يزيد الاسم الكامل عن 100 حرف", "Full name must be at most 100 characters long");
    return null;
  };

  const canSubmit = useMemo(() => {
    if (isForgot) return Boolean(form.email);
    if (type === "register") return Boolean(form.fullName && form.email && form.password);
    return Boolean(form.email && form.password);
  }, [form.email, form.fullName, form.password, isForgot, type]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError(t(lang, "يرجى إدخال البيانات المطلوبة", "Please fill in the required fields"));
      return;
    }

    if (type === "register") {
      const fullNameError = getRegisterFullNameError(form.fullName);
      if (fullNameError) {
        setError(fullNameError);
        return;
      }

      const passwordError = getRegisterPasswordError(form.password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (type === "login") {
        const response = await authService.login({ email: form.email, password: form.password });
        const { user, accessToken, refreshToken } = response.data;
        setStorageItem(storageKeys.authToken, accessToken);
        setStorageItem(storageKeys.refreshToken, refreshToken);
        setStorageItem(storageKeys.user, user);
        dispatch(setAuthUser({ user, token: accessToken, refreshToken }));
        setSuccess(t(lang, "تم تسجيل الدخول بنجاح", "Signed in successfully"));
        navigate("dashboard");
        return;
      }

      if (type === "register") {
        const response = await authService.register({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        });
        const { user, accessToken, refreshToken } = response.data;
        setStorageItem(storageKeys.authToken, accessToken);
        setStorageItem(storageKeys.refreshToken, refreshToken);
        setStorageItem(storageKeys.user, user);
        dispatch(setAuthUser({ user, token: accessToken, refreshToken }));
        setSuccess(t(lang, "تم إنشاء الحساب بنجاح", "Account created successfully"));
        navigate("dashboard");
        return;
      }

      setSuccess(t(lang, "لم يتم دعم استعادة كلمة المرور عبر هذه المرحلة", "Password recovery is not supported by the backend yet"));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t(lang, "حدث خطأ غير متوقع", "An unexpected error occurred");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const titles = {
    login: t(lang, "تسجيل الدخول", "Sign In"),
    register: t(lang, "إنشاء حساب", "Create Account"),
    forgot: t(lang, "استعادة كلمة المرور", "Reset Password"),
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      {/* Top bar */}
      <div className="fixed top-4 start-4 z-50 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl text-sm font-semibold hover:bg-muted shadow-sm transition-colors">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-black"><span className="text-primary">سوق</span>X</span>
        </Link>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center hover:bg-muted font-bold text-xs transition-colors">
          {lang === "ar" ? "EN" : "ع"}
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl shadow-primary/5">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
              {type === "forgot" ? <Mail className="w-8 h-8 text-primary" /> : <User className="w-8 h-8 text-primary" />}
            </div>
            <h1 className="text-2xl font-black">{titles[type]}</h1>
            <p className="text-muted-foreground text-sm mt-2">
              {type === "login" && t(lang, "مرحباً بعودتك! أدخل بيانات حسابك", "Welcome back! Enter your account details")}
              {type === "register" && t(lang, "انضم لأكثر من 2 مليون مستخدم", "Join over 2 million users")}
              {type === "forgot" && t(lang, "سنرسل لك رابط إعادة التعيين", "We'll send you a reset link")}
            </p>
          </div>

          {type !== "forgot" && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[{ icon: "🌐", label: "Google" }, { icon: "🍎", label: "Apple" }, { icon: "📘", label: "Facebook" }].map((s) => (
                <button key={s.label} className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-2xl hover:bg-muted text-sm font-medium transition-colors">
                  <span>{s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
          )}

          {(error || success) && (
            <div className={`mb-4 rounded-2xl border px-4 py-3 text-sm flex items-start gap-2 ${error ? "border-red-500/30 bg-red-500/10 text-red-600" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"}`}>
              {error ? <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
              <span>{error ?? success}</span>
            </div>
          )}

          {type !== "forgot" && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 border-t border-border" />
              <span className="text-xs text-muted-foreground font-medium">{t(lang, "أو بالبريد الإلكتروني", "or with email")}</span>
              <div className="flex-1 border-t border-border" />
            </div>
          )}

          <div className="space-y-4">
            {type === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold block mb-2">{t(lang, "الاسم الكامل", "Full Name")}</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 bg-muted border border-transparent focus:border-primary focus:bg-background rounded-xl text-sm outline-none transition-colors"
                    placeholder={t(lang, "أدخل الاسم الكامل", "Enter your full name")}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t(lang, "يجب أن يكون الاسم الكامل من حرفين إلى 100 حرف.", "Full name must be 2 to 100 characters long.")}
                  </p>
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-semibold block mb-2">{t(lang, "البريد الإلكتروني", "Email Address")}</label>
              <div className="relative">
                <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full ps-10 pe-4 py-3 bg-muted border border-transparent focus:border-primary focus:bg-background rounded-xl text-sm outline-none transition-colors"
                  placeholder="name@email.com"
                />
              </div>
            </div>
            {type !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">{t(lang, "كلمة المرور", "Password")}</label>
                  {type === "login" && (
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      {t(lang, "نسيت كلمة المرور؟", "Forgot password?")}
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full ps-10 pe-12 py-3 bg-muted border border-transparent focus:border-primary focus:bg-background rounded-xl text-sm outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button onClick={() => setShowPwd(!showPwd)} className="absolute end-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {type === "register" && (
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {t(lang, "استخدم 8 أحرف على الأقل مع حرف كبير، حرف صغير، رقم، ورمز خاص.", "Use at least 8 characters with uppercase, lowercase, number, and special character.")}
                  </p>
                )}
              </div>
            )}
            {type === "register" && (
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="w-5 h-5 rounded-md border-2 border-border hover:border-primary mt-0.5 shrink-0 transition-colors" />
                <span className="text-sm text-muted-foreground">{t(lang, "أوافق على ", "I agree to the ")} <span className="text-primary font-semibold">{t(lang, "الشروط والأحكام", "Terms & Conditions")}</span> {t(lang, "وسياسة الخصوصية", "and Privacy Policy")}</span>
              </label>
            )}
            <button onClick={handleSubmit} disabled={loading} className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70">
              {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? t(lang, "جارٍ المعالجة...", "Processing...") : titles[type]}
            </button>
          </div>

          <div className="text-center mt-6 text-sm">
            {type === "login" && (
              <span className="text-muted-foreground">{t(lang, "ليس لديك حساب؟ ", "Don't have an account? ")}
                <Link href="/register" className="text-primary font-semibold hover:underline">{t(lang, "إنشاء حساب جديد", "Create Account")}</Link>
              </span>
            )}
            {type === "register" && (
              <span className="text-muted-foreground">{t(lang, "لديك حساب بالفعل؟ ", "Already have an account? ")}
                <Link href="/login" className="text-primary font-semibold hover:underline">{t(lang, "تسجيل الدخول", "Sign In")}</Link>
              </span>
            )}
            {type === "forgot" && (
              <Link href="/login" className="text-primary font-semibold hover:underline">{t(lang, "العودة لتسجيل الدخول", "Back to Sign In")}</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
