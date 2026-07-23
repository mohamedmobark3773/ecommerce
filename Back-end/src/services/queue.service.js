export class QueueService {
  async enqueue(name, payload = {}) {
    return { success: true, queue: name, payload };
  }
}

export const queueService = new QueueService();
export default queueService;

