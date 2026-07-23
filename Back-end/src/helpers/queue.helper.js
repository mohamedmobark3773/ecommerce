export const queueName = (name) => `queue:${name}`;
export const buildQueuePayload = (data = {}) => ({ data });

export default { queueName, buildQueuePayload };

