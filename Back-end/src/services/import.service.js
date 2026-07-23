export class ImportService {
  async importData(payload = {}) {
    return { success: true, message: 'Import started.', payload };
  }
}

export const importService = new ImportService();
export default importService;

