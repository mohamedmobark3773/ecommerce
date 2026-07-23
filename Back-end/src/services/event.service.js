export class EventService {
  async emit(eventName, payload = {}) {
    return { success: true, eventName, payload };
  }
}

export const eventService = new EventService();
export default eventService;

