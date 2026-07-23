//src/constants/cache.constants.js

export const CACHE = {
  KEY_PREFIXES: {
    USER: "user:",
    PRODUCT: "product:",
    CATEGORY: "category:",
    CART: "cart:",
    ORDER: "order:",
  },

  TTL: {
    USER: 24 * 60 * 60,
    PRODUCT: 7 * 24 * 60 * 60,
    CATEGORY: 7 * 24 * 60 * 60,
    CART: 24 * 60 * 60,
    ORDER: 30 * 24 * 60 * 60, 
  },

  DEFAULT_TTL: 24 * 60 * 60, 

  CACHE_HIT_MISS_RATIO: 0.8, 
  STALE_TTL: 7 * 24 * 60 * 60, 
};

export const CACHE_STATS = {
  TOTAL_CACHED_KEYS: 0,
  CACHE_HIT_COUNT: 0,
  CACHE_MISS_COUNT: 0,
  CACHE_HIT_RATE: 0,
  STALE_DATA_COUNT: 0,
  CACHE_EVICTION_COUNT: 0,
  CACHE_PURGE_COUNT: 0,
};

export const CACHE_EVENTS = {
  CACHE_HIT: "cache_hit",
  CACHE_MISS: "cache_miss",
  CACHE_SET: "cache_set",
  CACHE_GET: "cache_get",
  CACHE_DELETE: "cache_delete",
  CACHE_PURGE: "cache_purge",
  STALE_DATA_RETRIEVED: "stale_data_retrieved",
};
