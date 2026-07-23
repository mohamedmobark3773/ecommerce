import express from 'express';
import { BaseController } from '../controllers/base.controller.js';

class InvoiceController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `invoice-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'invoice';
  }
}

const controller = new InvoiceController();
const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export const invoiceRouter = router;
export default router;

