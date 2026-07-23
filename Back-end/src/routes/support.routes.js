import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createSupportTicketValidator,
  deleteSupportTicketValidator,
  getAllSupportTicketsValidator,
  getSupportTicketByIdValidator,
  updateSupportTicketValidator,
} from '../validators/support.validator.js';

class SupportController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `support-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'support ticket';
  }
}

const controller = new SupportController();
const router = express.Router();

router.post('/', createSupportTicketValidator, validate, controller.create);
router.get('/', getAllSupportTicketsValidator, validate, controller.getAll);
router.get('/:id', getSupportTicketByIdValidator, validate, controller.getById);
router.put('/:id', updateSupportTicketValidator, validate, controller.update);
router.patch('/:id', updateSupportTicketValidator, validate, controller.update);
router.delete('/:id', deleteSupportTicketValidator, validate, controller.delete);

export const supportRouter = router;
export default router;

