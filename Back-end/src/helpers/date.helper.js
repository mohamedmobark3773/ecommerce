export const toIsoDate = (value) => (value ? new Date(value).toISOString() : null);
export const isExpired = (value, now = new Date()) => Boolean(value && new Date(value) < now);
export const addDays = (date, days) => new Date(new Date(date).setDate(new Date(date).getDate() + days));

export default { toIsoDate, isExpired, addDays };

