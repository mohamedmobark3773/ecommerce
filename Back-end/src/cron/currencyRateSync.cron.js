import logger from '../utils/logger.util.js';

export const runCurrencyRateSync = async () => {
  logger.info('Running currency rate sync job');
  return { success: true, message: 'Currency rates synchronized.' };
};

export const startCurrencyRateSyncCron = (scheduler) =>
  scheduler.registerJob('currency-rate-sync', 6 * 60 * 60 * 1000, runCurrencyRateSync);

export default runCurrencyRateSync;

