import { EventEmitter } from 'events';

class AppEmitter extends EventEmitter {}

const emitter = new AppEmitter();

export const emitEvent = (event, payload = {}) => emitter.emit(event, payload);
export const onEvent = (event, listener) => emitter.on(event, listener);
export const offEvent = (event, listener) => emitter.off(event, listener);
export const onceEvent = (event, listener) => emitter.once(event, listener);

export default emitter;

