import { emitEvent } from './emitter.js';

export const emitPushEvent = (event, payload = {}) => {
  emitEvent(`push:${event}`, payload);
};

export default emitPushEvent;

