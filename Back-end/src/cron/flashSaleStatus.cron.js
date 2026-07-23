import logger from '../utils/logger.util.js';

export const runFlashSaleStatusUpdate = async () => {
  logger.info('Running flash sale status update job');
  return { success: true, message: 'Flash sale statuses updated.' };
};

export const startFlashSaleStatusCron = (scheduler) =>
  scheduler.registerJob('flash-sale-status', 5 * 60 * 1000, runFlashSaleStatusUpdate);

export default runFlashSaleStatusUpdate;

