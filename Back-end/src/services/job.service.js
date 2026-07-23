export class JobService {
  async runJob(name, payload = {}) {
    return { success: true, job: name, payload };
  }
}

export const jobService = new JobService();
export default jobService;

