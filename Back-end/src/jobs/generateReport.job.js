import { BaseJob } from './base.job.js';

export class GenerateReportJob extends BaseJob {
  constructor() {
    super('generate-report');
  }

  async run(payload = {}) {
    return { success: true, message: 'Report generated.', payload };
  }
}

export default GenerateReportJob;

