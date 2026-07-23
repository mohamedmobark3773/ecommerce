import { emitEvent } from './emitter.js';

export const emitAuthEvent = (event, payload = {}) => {
  emitEvent(`auth:${event}`, payload);
};

export default emitAuthEvent;

