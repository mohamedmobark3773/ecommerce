import { emitEvent } from './emitter.js';

export const emitInventoryEvent = (event, payload = {}) => {
  emitEvent(`inventory:${event}`, payload);
};

export default emitInventoryEvent;

