import BaseService from './base.service.js';
import { settingsRepository } from '../repositories/settings.repository.js';

class SettingsService extends BaseService {
  constructor() {
    super(settingsRepository, 'settings');
  }
}

export const settingsService = new SettingsService();
export default settingsService;

