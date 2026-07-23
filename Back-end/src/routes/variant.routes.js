import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createVariantValidator,
  deleteVariantValidator,
  getAllVariantsValidator,
  getVariantByIdValidator,
  updateVariantValidator,
} from '../validators/variant.validator.js';

class VariantController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `variant-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'variant';
  }
}

const controller = new VariantController();
const router = express.Router();

router.post('/', createVariantValidator, validate, controller.create);
router.get('/', getAllVariantsValidator, validate, controller.getAll);
router.get('/:id', getVariantByIdValidator, validate, controller.getById);
router.put('/:id', updateVariantValidator, validate, controller.update);
router.patch('/:id', updateVariantValidator, validate, controller.update);
router.delete('/:id', deleteVariantValidator, validate, controller.delete);

export const variantRouter = router;
export default router;

