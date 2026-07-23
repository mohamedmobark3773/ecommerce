import { emitEvent } from './emitter.js';

export const emitWebhookEvent = (event, payload = {}) => {
  emitEvent(`webhook:${event}`, payload);
};

export default emitWebhookEvent;

