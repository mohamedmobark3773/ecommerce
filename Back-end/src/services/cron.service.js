export class CronService {
  async runJob(name) {
    return { success: true, job: name };
  }
}

export const cronService = new CronService();
export default cronService;

