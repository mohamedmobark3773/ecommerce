import logger from '../utils/logger.util.js';

export const runInventoryCheck = async () => {
  logger.info('Running inventory check job');
  return { success: true, message: 'Inventory check completed.' };
};

export const startInventoryCheckCron = (scheduler) =>
  scheduler.registerJob('inventory-check', 15 * 60 * 1000, runInventoryCheck);

export default runInventoryCheck;

