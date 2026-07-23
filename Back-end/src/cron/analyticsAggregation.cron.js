import logger from '../utils/logger.util.js';

export const runAnalyticsAggregation = async () => {
  logger.info('Running analytics aggregation job');
  return { success: true, message: 'Analytics aggregation completed.' };
};

export const startAnalyticsAggregationCron = (scheduler) =>
  scheduler.registerJob('analytics-aggregation', 6 * 60 * 60 * 1000, runAnalyticsAggregation);

export default runAnalyticsAggregation;

