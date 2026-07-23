import adminRouter from "./admin.routes.js";
import { AdminSettings } from "./admin.model.js";
import { adminRepository } from "./admin.repository.js";
import { adminService } from "./admin.service.js";
import { AdminSettingsDTO, AdminUserDTO } from "./admin.dto.js";
import * as adminController from "./admin.controller.js";
import * as adminValidator from "./admin.validator.js";

export {
  adminRouter as default,
  adminRouter,
  AdminSettings,
  adminRepository,
  adminService,
  AdminSettingsDTO,
  AdminUserDTO,
  adminController,
  adminValidator,
};
