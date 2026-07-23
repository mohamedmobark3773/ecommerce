import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  adjustStockValidator,
  createInventoryValidator,
  deleteInventoryValidator,
  getAllInventoryValidator,
  getInventoryByIdValidator,
  updateInventoryValidator,
} from '../validators/inventory.validator.js';

class InventoryController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `inventory-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'inventory';
  }
}

const controller = new InventoryController();
const router = express.Router();

router.post('/', createInventoryValidator, validate, controller.create);
router.post('/:id/adjust', adjustStockValidator, validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Stock adjusted.', data: req.body });
});
router.get('/', getAllInventoryValidator, validate, controller.getAll);
router.get('/:id', getInventoryByIdValidator, validate, controller.getById);
router.put('/:id', updateInventoryValidator, validate, controller.update);
router.patch('/:id', updateInventoryValidator, validate, controller.update);
router.delete('/:id', deleteInventoryValidator, validate, controller.delete);

export const inventoryRouter = router;
export default router;

