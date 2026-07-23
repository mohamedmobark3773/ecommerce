import type { Lang } from "@/types";

export const t = (lang: Lang, ar: string, en: string) =>
  lang === "ar" ? ar : en;
