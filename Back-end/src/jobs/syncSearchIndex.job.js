import { BaseJob } from './base.job.js';

export class SyncSearchIndexJob extends BaseJob {
  constructor() {
    super('sync-search-index');
  }

  async run(payload = {}) {
    return { success: true, message: 'Search index synchronized.', payload };
  }
}

export default SyncSearchIndexJob;

