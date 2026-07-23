import dotenv from "dotenv";
dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  jwtAccessSecret: process.env.JWT_SECRET || "access_secret",
  jwtAccessExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_secret",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  sessionSecret: process.env.SESSION_SECRET || null,
};

// In production, require critical secrets to be present explicitly
if (config.nodeEnv === 'production') {
  const required = [
    'mongoUri',
    'jwtAccessSecret',
    'jwtRefreshSecret',
    'sessionSecret',
  ];

  const missing = required.filter((k) => !config[k]);

  if (missing.length) {
    throw new Error(
      `Missing required environment variables in production: ${missing.join(', ')}`
    );
  }
}

export default config;
