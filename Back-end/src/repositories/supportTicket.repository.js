import BaseRepository from './base.repository.js';

class SupportTicketRepository extends BaseRepository {
  constructor() {
    super('supportTicket');
  }
}

export const supportTicketRepository = new SupportTicketRepository();
export default supportTicketRepository;

