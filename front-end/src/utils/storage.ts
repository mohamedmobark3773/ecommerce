export function setStorageItem<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getStorageItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const item = window.localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export function removeStorageItem(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
