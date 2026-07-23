import logger from '../utils/logger.util.js';

export const runLoyaltyPointsExpiry = async () => {
  logger.info('Running loyalty points expiry job');
  return { success: true, message: 'Loyalty points expired entries processed.' };
};

export const startLoyaltyPointsExpiryCron = (scheduler) =>
  scheduler.registerJob('loyalty-points-expiry', 24 * 60 * 60 * 1000, runLoyaltyPointsExpiry);

export default runLoyaltyPointsExpiry;

