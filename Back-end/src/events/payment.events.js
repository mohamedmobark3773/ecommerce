import { emitEvent } from './emitter.js';

export const emitPaymentEvent = (event, payload = {}) => {
  emitEvent(`payment:${event}`, payload);
};

export default emitPaymentEvent;

