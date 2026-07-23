import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createProfileValidator,
  deleteProfileValidator,
  getAllProfilesValidator,
  getProfileByIdValidator,
  updateProfileValidator,
} from '../validators/profile.validator.js';

class ProfileController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `profile-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'profile';
  }
}

const controller = new ProfileController();
const router = express.Router();

router.post('/', createProfileValidator, validate, controller.create);
router.get('/', getAllProfilesValidator, validate, controller.getAll);
router.get('/:id', getProfileByIdValidator, validate, controller.getById);
router.put('/:id', updateProfileValidator, validate, controller.update);
router.patch('/:id', updateProfileValidator, validate, controller.update);
router.delete('/:id', deleteProfileValidator, validate, controller.delete);

export const profileRouter = router;
export default router;

