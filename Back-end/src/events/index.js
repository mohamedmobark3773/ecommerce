import emitter, { emitEvent, onEvent, offEvent, onceEvent } from './emitter.js';
import emitAuditEvent from './audit.events.js';
import emitAuthEvent from './auth.events.js';
import emitChatEvent from './chat.events.js';
import emitEmailEvent from './email.events.js';
import emitInventoryEvent from './inventory.events.js';
import emitNotificationEvent from './notification.events.js';
import emitOrderEvent from './order.events.js';
import emitPaymentEvent from './payment.events.js';
import emitProductEvent from './product.events.js';
import emitPushEvent from './push.events.js';
import emitSmsEvent from './sms.events.js';
import emitWebhookEvent from './webhook.events.js';

export { emitter, emitEvent, onEvent, offEvent, onceEvent };
export { emitAuditEvent, emitAuthEvent, emitChatEvent, emitEmailEvent, emitInventoryEvent, emitNotificationEvent, emitOrderEvent, emitPaymentEvent, emitProductEvent, emitPushEvent, emitSmsEvent, emitWebhookEvent };

export * from './audit.events.js';
export * from './auth.events.js';
export * from './chat.events.js';
export * from './email.events.js';
export * from './inventory.events.js';
export * from './notification.events.js';
export * from './order.events.js';
export * from './payment.events.js';
export * from './product.events.js';
export * from './push.events.js';
export * from './sms.events.js';
export * from './webhook.events.js';

export default {
  emitter,
  emitAuditEvent,
  emitAuthEvent,
  emitChatEvent,
  emitEmailEvent,
  emitInventoryEvent,
  emitNotificationEvent,
  emitOrderEvent,
  emitPaymentEvent,
  emitProductEvent,
  emitPushEvent,
  emitSmsEvent,
  emitWebhookEvent,
};

