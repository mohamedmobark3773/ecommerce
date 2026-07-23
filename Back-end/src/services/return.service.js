export class ReturnService {
  async createReturn(payload = {}) {
    return { success: true, message: 'Return requested.', payload };
  }
}

export const returnService = new ReturnService();
export default returnService;

