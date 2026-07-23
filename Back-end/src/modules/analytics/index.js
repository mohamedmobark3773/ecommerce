import analyticsRouter from "./analytics.routes.js";
import { analyticsRepository } from "./analytics.repository.js";
import { analyticsService } from "./analytics.service.js";
import { AnalyticsDTO } from "./analytics.dto.js";
import * as analyticsController from "./analytics.controller.js";
import * as analyticsValidator from "./analytics.validator.js";

export {
  analyticsRouter as default,
  analyticsRouter,
  analyticsRepository,
  analyticsService,
  AnalyticsDTO,
  analyticsController,
  analyticsValidator,
};
