/**
 * Search is implemented as a query layer rather than a persisted Mongoose model.
 * This lightweight contract keeps the search module consistent around supported
 * filters, pagination defaults, and the primary collection being searched.
 */
export const SearchModel = {
  primaryCollection: "products",
  supportedFilters: ["q", "category", "brand", "status", "minPrice", "maxPrice", "page", "limit"],
  defaultOptions: {
    page: 1,
    limit: 20,
    maxLimit: 100,
  },
};

