export function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
