export const formatCurrency = (amount = 0, currency = 'USD') => `${currency} ${Number(amount).toFixed(2)}`;
export const roundCurrency = (amount = 0) => Math.round(amount * 100) / 100;

export default { formatCurrency, roundCurrency };

