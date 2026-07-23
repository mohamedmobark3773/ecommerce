import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createSubcategoryValidator,
  deleteSubcategoryValidator,
  getAllSubcategoriesValidator,
  getSubcategoryByIdValidator,
  updateSubcategoryValidator,
} from '../validators/subcategory.validator.js';

class SubcategoryController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `subcategory-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'subcategory';
  }
}

const controller = new SubcategoryController();
const router = express.Router();

router.post('/', createSubcategoryValidator, validate, controller.create);
router.get('/', getAllSubcategoriesValidator, validate, controller.getAll);
router.get('/:id', getSubcategoryByIdValidator, validate, controller.getById);
router.put('/:id', updateSubcategoryValidator, validate, controller.update);
router.patch('/:id', updateSubcategoryValidator, validate, controller.update);
router.delete('/:id', deleteSubcategoryValidator, validate, controller.delete);

export const subcategoryRouter = router;
export default router;

