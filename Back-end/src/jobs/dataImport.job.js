import { BaseJob } from './base.job.js';

export class DataImportJob extends BaseJob {
  constructor() {
    super('data-import');
  }

  async run(payload = {}) {
    return { success: true, message: 'Data import completed.', payload };
  }
}

export default DataImportJob;

