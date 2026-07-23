import { emitEvent } from './emitter.js';

export const emitSmsEvent = (event, payload = {}) => {
  emitEvent(`sms:${event}`, payload);
};

export default emitSmsEvent;

