import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createWalletValidator,
  deleteWalletValidator,
  getAllWalletsValidator,
  getWalletByIdValidator,
  updateWalletValidator,
  walletTransactionValidator,
} from '../validators/wallet.validator.js';

class WalletController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `wallet-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'wallet';
  }
}

const controller = new WalletController();
const router = express.Router();

router.post('/', createWalletValidator, validate, controller.create);
router.post('/:id/transaction', walletTransactionValidator, validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Wallet transaction processed.', data: req.body });
});
router.get('/', getAllWalletsValidator, validate, controller.getAll);
router.get('/:id', getWalletByIdValidator, validate, controller.getById);
router.put('/:id', updateWalletValidator, validate, controller.update);
router.patch('/:id', updateWalletValidator, validate, controller.update);
router.delete('/:id', deleteWalletValidator, validate, controller.delete);

export const walletRouter = router;
export default router;

