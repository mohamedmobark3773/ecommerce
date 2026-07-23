export const buildWebhookPayload = (event, data = {}) => ({ event, data, timestamp: new Date().toISOString() });
export const isWebhookEvent = (event) => Boolean(event);

export default { buildWebhookPayload, isWebhookEvent };

