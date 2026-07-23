import logger from '../utils/logger.util.js';

export const logInfo = (...args) => logger.info(...args);
export const logError = (...args) => logger.error(...args);
export const logWarn = (...args) => logger.warn(...args);

export default { logInfo, logError, logWarn };

