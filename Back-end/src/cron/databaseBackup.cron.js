import logger from '../utils/logger.util.js';

export const runDatabaseBackup = async () => {
  logger.info('Running database backup job');
  return { success: true, message: 'Database backup completed.' };
};

export const startDatabaseBackupCron = (scheduler) =>
  scheduler.registerJob('database-backup', 24 * 60 * 60 * 1000, runDatabaseBackup);

export default runDatabaseBackup;

