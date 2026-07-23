export const calculateShippingFee = (weight = 0, rate = 1) => Number(weight) * Number(rate);
export const formatShippingLabel = (country, city) => `${city}, ${country}`;

export default { calculateShippingFee, formatShippingLabel };

