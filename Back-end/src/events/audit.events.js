import { emitEvent } from './emitter.js';

export const emitAuditEvent = (action, meta = {}) => {
  emitEvent('audit:log', { action, ...meta });
};

export default emitAuditEvent;

