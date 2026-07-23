import BaseRepository from './base.repository.js';

class MediaRepository extends BaseRepository {
  constructor() {
    super('media');
  }
}

export const mediaRepository = new MediaRepository();
export default mediaRepository;

