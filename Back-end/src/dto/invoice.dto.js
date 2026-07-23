export class InvoiceDTO {
  constructor(invoice) {
    this.id = invoice._id || invoice.id || null;
    this.orderId = invoice.orderId || null;
    this.amount = invoice.amount || 0;
    this.status = invoice.status || 'pending';
    this.createdAt = invoice.createdAt || null;
    this.updatedAt = invoice.updatedAt || null;
  }

  static transform(invoice) {
    if (!invoice) return null;
    if (Array.isArray(invoice)) {
      return invoice.map((item) => new InvoiceDTO(item));
    }
    return new InvoiceDTO(invoice);
  }

  static toDatabase(data = {}) {
    return {
      orderId: data.orderId || undefined,
      amount: typeof data.amount === 'number' ? data.amount : undefined,
      status: data.status ? data.status : undefined,
    };
  }
}

export default InvoiceDTO;

