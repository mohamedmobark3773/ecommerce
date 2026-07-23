import logger from '../utils/logger.util.js';
import { startAbandonedCartCron } from './abandonedCart.cron.js';
import { startAnalyticsAggregationCron } from './analyticsAggregation.cron.js';
import { startAuditLogCleanupCron } from './auditLogCleanup.cron.js';
import { startCurrencyRateSyncCron } from './currencyRateSync.cron.js';
import { startDatabaseBackupCron } from './databaseBackup.cron.js';
import { startExpiredCouponCron } from './expiredCoupon.cron.js';
import { startFlashSaleStatusCron } from './flashSaleStatus.cron.js';
import { startInventoryCheckCron } from './inventoryCheck.cron.js';
import { startLoyaltyPointsExpiryCron } from './loyaltyPointsExpiry.cron.js';
import { startSubscriptionRenewalCron } from './subscriptionRenewal.cron.js';
import { startTempFileCleanupCron } from './tempFileCleanup.cron.js';

class CronScheduler {
  constructor() {
    this.jobs = [];
  }

  registerJob(name, schedule, task) {
    const intervalMs = typeof schedule === 'number' ? schedule : schedule?.intervalMs ?? 60 * 1000;

    const run = async () => {
      try {
        const result = await task();
        logger.info(`[${name}] completed`, result);
      } catch (error) {
        logger.error(`[${name}] failed`, error);
      }
    };

    const timer = setInterval(() => {
      void run();
    }, intervalMs);

    this.jobs.push({ name, timer, intervalMs });
    void run();

    return { name, intervalMs };
  }

  stopAll() {
    this.jobs.forEach(({ timer }) => clearInterval(timer));
    this.jobs = [];
  }
}

export const scheduler = new CronScheduler();

export const registerAllCrons = () => {
  startAbandonedCartCron(scheduler);
  startAnalyticsAggregationCron(scheduler);
  startAuditLogCleanupCron(scheduler);
  startCurrencyRateSyncCron(scheduler);
  startDatabaseBackupCron(scheduler);
  startExpiredCouponCron(scheduler);
  startFlashSaleStatusCron(scheduler);
  startInventoryCheckCron(scheduler);
  startLoyaltyPointsExpiryCron(scheduler);
  startSubscriptionRenewalCron(scheduler);
  startTempFileCleanupCron(scheduler);

  logger.info('All cron jobs registered.');
  return scheduler;
};

export default scheduler;

