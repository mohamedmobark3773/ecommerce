"use client";

import { Provider } from "react-redux";
import { PersistGate } from "@/providers/PersistGate";
import { store } from "@/store";
import type { ReactNode } from "react";

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate>{children}</PersistGate>
    </Provider>
  );
}
