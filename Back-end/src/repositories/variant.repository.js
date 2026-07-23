import BaseRepository from './base.repository.js';

class VariantRepository extends BaseRepository {
  constructor() {
    super('variant');
  }
}

export const variantRepository = new VariantRepository();
export default variantRepository;

