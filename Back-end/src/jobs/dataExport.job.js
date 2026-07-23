import { BaseJob } from './base.job.js';

export class DataExportJob extends BaseJob {
  constructor() {
    super('data-export');
  }

  async run(payload = {}) {
    return { success: true, message: 'Data export completed.', payload };
  }
}

export default DataExportJob;

