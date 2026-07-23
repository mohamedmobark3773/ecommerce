import BaseService from './base.service.js';
import { mediaRepository } from '../repositories/media.repository.js';

class MediaService extends BaseService {
  constructor() {
    super(mediaRepository, 'media');
  }
}

export const mediaService = new MediaService();
export default mediaService;

