import { emitEvent } from './emitter.js';

export const emitChatEvent = (event, payload = {}) => {
  emitEvent(`chat:${event}`, payload);
};

export default emitChatEvent;

