import BaseService from './base.service.js';
import { auditLogRepository } from '../repositories/auditLog.repository.js';

class AuditLogService extends BaseService {
  constructor() {
    super(auditLogRepository, 'audit log');
  }
}

export const auditLogService = new AuditLogService();
export default auditLogService;

