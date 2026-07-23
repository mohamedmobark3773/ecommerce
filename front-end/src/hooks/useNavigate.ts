"use client";

import { useRouter } from "next/navigation";
import type { Page } from "@/types";
import { pageToUrl } from "@/lib/navigation";

export function useNavigate() {
  const router = useRouter();
  return (page: Page) => {
    router.push(pageToUrl[page]);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
}
