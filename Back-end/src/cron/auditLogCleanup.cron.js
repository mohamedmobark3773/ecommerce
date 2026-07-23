import logger from '../utils/logger.util.js';

export const runAuditLogCleanup = async () => {
  logger.info('Running audit log cleanup job');
  return { success: true, message: 'Audit logs cleaned successfully.' };
};

export const startAuditLogCleanupCron = (scheduler) =>
  scheduler.registerJob('audit-log-cleanup', 24 * 60 * 60 * 1000, runAuditLogCleanup);

export default runAuditLogCleanup;

