import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createRefundValidator,
  deleteRefundValidator,
  getAllRefundsValidator,
  getRefundByIdValidator,
  updateRefundValidator,
} from '../validators/refund.validator.js';

class RefundController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `refund-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'refund';
  }
}

const controller = new RefundController();
const router = express.Router();

router.post('/', createRefundValidator, validate, controller.create);
router.get('/', getAllRefundsValidator, validate, controller.getAll);
router.get('/:id', getRefundByIdValidator, validate, controller.getById);
router.put('/:id', updateRefundValidator, validate, controller.update);
router.patch('/:id', updateRefundValidator, validate, controller.update);
router.delete('/:id', deleteRefundValidator, validate, controller.delete);

export const refundRouter = router;
export default router;

