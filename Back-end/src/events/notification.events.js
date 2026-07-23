import { emitEvent } from './emitter.js';

export const emitNotificationEvent = (event, payload = {}) => {
  emitEvent(`notification:${event}`, payload);
};

export default emitNotificationEvent;

