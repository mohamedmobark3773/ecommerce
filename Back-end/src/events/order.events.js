import { emitEvent } from './emitter.js';

export const emitOrderEvent = (event, payload = {}) => {
  emitEvent(`order:${event}`, payload);
};

export default emitOrderEvent;

