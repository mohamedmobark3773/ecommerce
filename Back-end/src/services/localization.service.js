export class LocalizationService {
  async getLanguages() {
    return { success: true, data: [] };
  }

  async getCountries() {
    return { success: true, data: [] };
  }
}

export const localizationService = new LocalizationService();
export default localizationService;

