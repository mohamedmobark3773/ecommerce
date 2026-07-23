import { emitEvent } from './emitter.js';

export const emitProductEvent = (event, payload = {}) => {
  emitEvent(`product:${event}`, payload);
};

export default emitProductEvent;

