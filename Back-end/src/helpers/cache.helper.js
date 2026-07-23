export const buildCacheKey = (...parts) => parts.filter(Boolean).join(':');
export const normalizeCacheValue = (value) => (typeof value === 'string' ? value : JSON.stringify(value));
export const parseCacheValue = (value) => {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export default { buildCacheKey, normalizeCacheValue, parseCacheValue };

