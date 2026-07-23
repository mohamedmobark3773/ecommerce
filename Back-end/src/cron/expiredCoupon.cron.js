import logger from '../utils/logger.util.js';

export const runExpiredCouponCheck = async () => {
  logger.info('Running expired coupon check job');
  return { success: true, message: 'Expired coupons processed.' };
};

export const startExpiredCouponCron = (scheduler) =>
  scheduler.registerJob('expired-coupon-check', 60 * 60 * 1000, runExpiredCouponCheck);

export default runExpiredCouponCheck;

