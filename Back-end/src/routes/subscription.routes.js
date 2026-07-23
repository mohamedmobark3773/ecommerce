import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createSubscriptionValidator,
  deleteSubscriptionValidator,
  getAllSubscriptionsValidator,
  getSubscriptionByIdValidator,
  newsletterSubscribeValidator,
  updateSubscriptionValidator,
} from '../validators/subscription.validator.js';

class SubscriptionController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `subscription-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'subscription';
  }
}

const controller = new SubscriptionController();
const router = express.Router();

router.post('/', createSubscriptionValidator, validate, controller.create);
router.post('/newsletter', newsletterSubscribeValidator, validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Subscribed.', data: req.body });
});
router.get('/', getAllSubscriptionsValidator, validate, controller.getAll);
router.get('/:id', getSubscriptionByIdValidator, validate, controller.getById);
router.put('/:id', updateSubscriptionValidator, validate, controller.update);
router.patch('/:id', updateSubscriptionValidator, validate, controller.update);
router.delete('/:id', deleteSubscriptionValidator, validate, controller.delete);

export const subscriptionRouter = router;
export default router;

