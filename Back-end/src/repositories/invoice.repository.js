import BaseRepository from './base.repository.js';

class InvoiceRepository extends BaseRepository {
  constructor() {
    super('invoice');
  }
}

export const invoiceRepository = new InvoiceRepository();
export default invoiceRepository;

