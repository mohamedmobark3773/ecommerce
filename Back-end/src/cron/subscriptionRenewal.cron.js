import logger from '../utils/logger.util.js';

export const runSubscriptionRenewal = async () => {
  logger.info('Running subscription renewal job');
  return { success: true, message: 'Subscription renewals processed.' };
};

export const startSubscriptionRenewalCron = (scheduler) =>
  scheduler.registerJob('subscription-renewal', 24 * 60 * 60 * 1000, runSubscriptionRenewal);

export default runSubscriptionRenewal;

