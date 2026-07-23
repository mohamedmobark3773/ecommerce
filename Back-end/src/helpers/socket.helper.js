export const socketEvent = (event, payload = {}) => ({ event, payload });
export const emitToRoom = (socket, room, event, payload) => socket.to(room).emit(event, payload);

export default { socketEvent, emitToRoom };

