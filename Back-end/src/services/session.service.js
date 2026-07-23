import BaseService from './base.service.js';
import { sessionRepository } from '../repositories/session.repository.js';

class SessionService extends BaseService {
  constructor() {
    super(sessionRepository, 'session');
  }
}

export const sessionService = new SessionService();
export default sessionService;

