export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },
  products: {
    list: (filters?: Record<string, unknown>) => ["products", "list", filters ?? {}],
    detail: (id: string) => ["products", id],
  },
  categories: {
    list: (filters?: Record<string, unknown>) => ["categories", "list", filters ?? {}],
    detail: (id: string) => ["categories", id],
  },
  brands: {
    list: (filters?: Record<string, unknown>) => ["brands", "list", filters ?? {}],
    detail: (id: string) => ["brands", id],
  },
  attributes: {
    list: (filters?: Record<string, unknown>) => ["attributes", "list", filters ?? {}],
    detail: (id: string) => ["attributes", id],
  },
  reviews: {
    list: (filters?: Record<string, unknown>) => ["reviews", "list", filters ?? {}],
    detail: (id: string) => ["reviews", id],
  },
};
