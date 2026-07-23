import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createAttributeValidator,
  deleteAttributeValidator,
  getAttributeValidator,
  getAttributesValidator,
  updateAttributeValidator,
} from '../validators/attribute.validator.js';

class AttributeController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `attribute-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'attribute';
  }
}

const controller = new AttributeController();
const router = express.Router();

router.post('/', createAttributeValidator, validate, controller.create);
router.get('/', getAttributesValidator, validate, controller.getAll);
router.get('/:id', getAttributeValidator, validate, controller.getById);
router.put('/:id', updateAttributeValidator, validate, controller.update);
router.patch('/:id', updateAttributeValidator, validate, controller.update);
router.delete('/:id', deleteAttributeValidator, validate, controller.delete);

export const attributeRouter = router;
export default router;

