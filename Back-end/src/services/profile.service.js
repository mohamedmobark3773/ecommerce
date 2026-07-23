import BaseService from './base.service.js';
import { profileRepository } from '../repositories/profile.repository.js';

class ProfileService extends BaseService {
  constructor() {
    super(profileRepository, 'profile');
  }
}

export const profileService = new ProfileService();
export default profileService;

