"use client";

import { useEffect, useState, type ReactNode } from "react";
import { persistor } from "@/store";
import { PersistGate as PersistGateComponent } from "redux-persist/integration/react";

export function PersistGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        setReady(true);
      }
    });

    if (persistor.getState().bootstrapped) {
      setReady(true);
    }
  }, []);

  if (!ready) {
    return null;
  }

  return <PersistGateComponent persistor={persistor}>{children}</PersistGateComponent>;
}
