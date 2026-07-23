import { BaseJob } from './base.job.js';

export class UpdateStockJob extends BaseJob {
  constructor() {
    super('update-stock');
  }

  async run(payload = {}) {
    return { success: true, message: 'Stock updated.', payload };
  }
}

export default UpdateStockJob;

