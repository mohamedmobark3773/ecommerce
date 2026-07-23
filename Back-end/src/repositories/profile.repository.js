import BaseRepository from './base.repository.js';

class ProfileRepository extends BaseRepository {
  constructor() {
    super('profile');
  }
}

export const profileRepository = new ProfileRepository();
export default profileRepository;

