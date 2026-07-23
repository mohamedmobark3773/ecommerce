import express from 'express';
import { BaseController } from '../controllers/base.controller.js';

class SettingsController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `settings-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'settings';
  }
}

const controller = new SettingsController();
const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export const settingsRouter = router;
export default router;

