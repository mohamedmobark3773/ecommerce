import BaseRepository from './base.repository.js';

class AuditLogRepository extends BaseRepository {
  constructor() {
    super('auditLog');
  }
}

export const auditLogRepository = new AuditLogRepository();
export default auditLogRepository;

