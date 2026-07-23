import BaseService from './base.service.js';
import { activityLogRepository } from '../repositories/activityLog.repository.js';

class ActivityLogService extends BaseService {
  constructor() {
    super(activityLogRepository, 'activity log');
  }
}

export const activityLogService = new ActivityLogService();
export default activityLogService;

