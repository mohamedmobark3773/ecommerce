"use client";

import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/store/AppContext";
import { QueryProvider } from "@/providers/QueryProvider";
import { ReduxProvider } from "@/providers/ThemeProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <ReduxProvider>
        <QueryProvider>
          <AppProvider>{children}</AppProvider>
        </QueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
