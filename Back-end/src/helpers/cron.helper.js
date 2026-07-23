export const toCronExpression = (minutes = 0) => `*/${minutes} * * * *`;
export const safeCronName = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default { toCronExpression, safeCronName };

