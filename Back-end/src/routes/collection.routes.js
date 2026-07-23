import express from 'express';
import { BaseController } from '../controllers/base.controller.js';
import { validate } from '../validators/base.validator.js';
import {
  createCollectionValidator,
  deleteCollectionValidator,
  getAllCollectionsValidator,
  getCollectionByIdValidator,
  updateCollectionValidator,
} from '../validators/collection.validator.js';

class CollectionController extends BaseController {
  constructor() {
    super({
      create: async (data) => ({ id: `collection-${Date.now()}`, ...data }),
      getAll: async (query) => ({ items: [], filters: query }),
      getById: async (id) => ({ id }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    });
    this.resourceName = 'collection';
  }
}

const controller = new CollectionController();
const router = express.Router();

router.post('/', createCollectionValidator, validate, controller.create);
router.get('/', getAllCollectionsValidator, validate, controller.getAll);
router.get('/:id', getCollectionByIdValidator, validate, controller.getById);
router.put('/:id', updateCollectionValidator, validate, controller.update);
router.patch('/:id', updateCollectionValidator, validate, controller.update);
router.delete('/:id', deleteCollectionValidator, validate, controller.delete);

export const collectionRouter = router;
export default router;

