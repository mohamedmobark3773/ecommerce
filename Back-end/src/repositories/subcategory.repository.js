import BaseRepository from './base.repository.js';

class SubcategoryRepository extends BaseRepository {
  constructor() {
    super('subcategory');
  }
}

export const subcategoryRepository = new SubcategoryRepository();
export default subcategoryRepository;

