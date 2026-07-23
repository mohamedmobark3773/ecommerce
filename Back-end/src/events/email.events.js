import { emitEvent } from './emitter.js';

export const emitEmailEvent = (event, payload = {}) => {
  emitEvent(`email:${event}`, payload);
};

export default emitEmailEvent;

