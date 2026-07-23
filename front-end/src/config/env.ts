export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api",
  apiTimeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 10000),
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "SouqX",
  appEnv: process.env.NODE_ENV ?? "development",
};

export function getApiBaseUrl() {
  return env.apiBaseUrl;
}
