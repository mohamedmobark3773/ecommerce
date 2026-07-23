export type Page =
  | "home" | "shop" | "product" | "cart" | "checkout"
  | "login" | "register" | "forgot"
  | "dashboard" | "orders" | "wishlist"
  | "seller" | "products" | "admin" | "users" | "analytics";

export type Lang = "ar" | "en";
export type Theme = "light" | "dark";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface User {
  id: string;
  name?: string;
  fullName?: string;
  email?: string;
  role?: string;
  status?: string;
  isEmailVerified?: boolean;
  phone?: string;
  avatar?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  parent?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  country?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Attribute {
  id: string;
  name: string;
  values?: string[];
  createdBy?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  price?: number;
  compareAtPrice?: number;
  costPerItem?: number;
  sku?: string;
  category?: string | Category | null;
  subcategory?: string | null;
  brand?: string | Brand | null;
  stock?: number;
  images?: string[];
  attributes?: Array<{ attributeId?: string; value?: string }>;
  isFeatured?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  user?: string | User | null;
  product?: string | Product | null;
  rating?: number;
  title?: string;
  comment?: string;
  isApproved?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ProductListResponse {
  products: Product[];
  pagination: PaginationMeta;
}

export interface CategoryListResponse {
  categories: Category[];
  pagination: PaginationMeta;
}

export interface BrandListResponse {
  brands: Brand[];
  pagination: PaginationMeta;
}

export interface AttributeListResponse {
  attributes: Attribute[];
  pagination: PaginationMeta;
}

export interface ReviewListResponse {
  reviews: Review[];
  pagination: PaginationMeta;
}

export interface CartItem {
  id: string;
  product?: string | Product | null;
  variant?: string | null;
  quantity: number;
  price: number;
  currency?: string;
  subtotal?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Cart {
  id: string;
  user?: string | User | null;
  items: CartItem[];
  itemsCount: number;
  totalItems: number;
  subtotal: number;
  total: number;
  currency: string;
  createdAt?: string;
  updatedAt?: string;
}
