export class ReportService {
  async generate(payload = {}) {
    return { success: true, message: 'Report generated.', payload };
  }
}

export const reportService = new ReportService();
export default reportService;

