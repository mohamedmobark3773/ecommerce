export class HealthService {
  async getStatus() {
    return { success: true, status: 'UP', uptime: process.uptime() };
  }
}

export const healthService = new HealthService();
export default healthService;

