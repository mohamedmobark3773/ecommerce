export const calculateTax = (amount = 0, rate = 0.1) => Number(amount) * Number(rate);
export const calculateTotalWithTax = (amount = 0, rate = 0.1) => Number(amount) + calculateTax(amount, rate);

export default { calculateTax, calculateTotalWithTax };

