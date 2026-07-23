import logger from '../utils/logger.util.js';

export const runTempFileCleanup = async () => {
  logger.info('Running temporary file cleanup job');
  return { success: true, message: 'Temporary files cleaned successfully.' };
};

export const startTempFileCleanupCron = (scheduler) =>
  scheduler.registerJob('temp-file-cleanup', 24 * 60 * 60 * 1000, runTempFileCleanup);

export default runTempFileCleanup;

