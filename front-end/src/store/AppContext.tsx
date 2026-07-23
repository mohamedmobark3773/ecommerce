"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { queryKeys } from "@/constants/queryKeys";
import { storageKeys } from "@/constants/storageKeys";
import { authService } from "@/services/auth.service";
import { cartService } from "@/services/cart.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuth, setAuthUser } from "@/store/slices/authSlice";
import { setCart } from "@/store/slices/cartSlice";
import { getStorageItem, removeStorageItem } from "@/utils/storage";
import type { Lang, User } from "@/types";

interface AppContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  cartCount: number;
  setCartCount: (n: number) => void;
}

const AppContext = createContext<AppContextValue>({
  lang: "ar",
  setLang: () => {},
  cartCount: 0,
  setCartCount: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart);
  const [hydrated, setHydrated] = useState(false);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof document !== "undefined") {
      document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = l;
      document.documentElement.style.fontFamily =
        l === "ar" ? "'Cairo', sans-serif" : "'Inter', 'Cairo', sans-serif";
    }
  };

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
    document.documentElement.style.fontFamily = "'Cairo', sans-serif";
  }, []);

  useEffect(() => {
    const token = getStorageItem<string>(storageKeys.authToken);
    const refreshToken = getStorageItem<string>(storageKeys.refreshToken);
    const storedUser = getStorageItem<User>(storageKeys.user);

    if (token) {
      dispatch(setAuthUser({ user: storedUser, token, refreshToken }));
    } else {
      dispatch(clearAuth());
    }

    setHydrated(true);
  }, [dispatch]);

  const { data: currentUser, isError, isSuccess } = useQuery<User>({
    queryKey: [...queryKeys.auth.me, authState.token],
    queryFn: () => authService.getMe().then((response) => response.data),
    enabled: Boolean(authState.token) && hydrated,
    retry: false,
  });

  useEffect(() => {
    if (!hydrated || !authState.token) {
      dispatch(setCart({ items: [], itemsCount: 0, totalItems: 0, subtotal: 0, total: 0, currency: "USD" }));
      return;
    }

    cartService.list()
      .then((cart) => {
        if (cart) {
          dispatch(setCart(cart));
        }
      })
      .catch(() => {
        dispatch(setCart({ items: [], itemsCount: 0, totalItems: 0, subtotal: 0, total: 0, currency: "USD" }));
      });
  }, [authState.token, dispatch, hydrated]);

  useEffect(() => {
    if (isError) {
      dispatch(clearAuth());
      removeStorageItem(storageKeys.authToken);
      removeStorageItem(storageKeys.refreshToken);
      removeStorageItem(storageKeys.user);
      return;
    }

    if (isSuccess && currentUser) {
      const latestToken = getStorageItem<string>(storageKeys.authToken);
      const latestRefreshToken = getStorageItem<string>(storageKeys.refreshToken);

      dispatch(
        setAuthUser({
          user: currentUser,
          token: latestToken ?? authState.token,
          refreshToken: latestRefreshToken ?? authState.refreshToken,
        })
      );
    }
  }, [authState.refreshToken, authState.token, currentUser, dispatch, isError, isSuccess]);

  const cartCount = cartState.itemsCount ?? cartState.totalItems ?? 0;

  return (
    <AppContext.Provider value={{ lang, setLang, cartCount, setCartCount: () => {} }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
