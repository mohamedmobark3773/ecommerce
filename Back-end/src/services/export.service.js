export class ExportService {
  async exportData(payload = {}) {
    return { success: true, message: 'Export started.', payload };
  }
}

export const exportService = new ExportService();
export default exportService;

