import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createGiftCardValidator,
  deleteGiftCardValidator,
  getAllGiftCardsValidator,
  getGiftCardByIdValidator,
  redeemGiftCardValidator,
  updateGiftCardValidator,
} from '../validators/giftCard.validator.js';

class GiftCardController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `gift-card-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'gift card';
  }
}

const controller = new GiftCardController();
const router = express.Router();

router.post('/', createGiftCardValidator, validate, controller.create);
router.post('/redeem', redeemGiftCardValidator, validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Gift card redeemed.', data: req.body });
});
router.get('/', getAllGiftCardsValidator, validate, controller.getAll);
router.get('/:id', getGiftCardByIdValidator, validate, controller.getById);
router.put('/:id', updateGiftCardValidator, validate, controller.update);
router.patch('/:id', updateGiftCardValidator, validate, controller.update);
router.delete('/:id', deleteGiftCardValidator, validate, controller.delete);

export const giftCardRouter = router;
export default router;

