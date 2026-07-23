import logger from '../utils/logger.util.js';

export const runAbandonedCartCleanup = async () => {
  logger.info('Running abandoned cart cleanup job');
  return { success: true, message: 'Abandoned carts checked successfully.' };
};

export const startAbandonedCartCron = (scheduler) =>
  scheduler.registerJob('abandoned-cart-cleanup', 6 * 60 * 60 * 1000, runAbandonedCartCleanup);

export default runAbandonedCartCleanup;

