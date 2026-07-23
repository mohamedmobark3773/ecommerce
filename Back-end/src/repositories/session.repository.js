import BaseRepository from './base.repository.js';

class SessionRepository extends BaseRepository {
  constructor() {
    super('session');
  }
}

export const sessionRepository = new SessionRepository();
export default sessionRepository;

