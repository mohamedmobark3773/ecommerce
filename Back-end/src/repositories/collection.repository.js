import BaseRepository from './base.repository.js';

class CollectionRepository extends BaseRepository {
  constructor() {
    super('collection');
  }
}

export const collectionRepository = new CollectionRepository();
export default collectionRepository;

