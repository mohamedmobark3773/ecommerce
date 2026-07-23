import type { Page } from "@/types";

export const pageToUrl: Record<Page, string> = {
  home: "/",
  shop: "/shop",
  product: "/product",
  cart: "/cart",
  checkout: "/checkout",
  login: "/login",
  register: "/register",
  forgot: "/forgot-password",
  dashboard: "/dashboard",
  orders: "/orders",
  wishlist: "/wishlist",
  seller: "/seller",
  products: "/seller/products",
  admin: "/admin",
  users: "/admin/users",
  analytics: "/admin/analytics",
};
