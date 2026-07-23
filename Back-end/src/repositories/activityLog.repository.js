import BaseRepository from './base.repository.js';

class ActivityLogRepository extends BaseRepository {
  constructor() {
    super('activityLog');
  }
}

export const activityLogRepository = new ActivityLogRepository();
export default activityLogRepository;

