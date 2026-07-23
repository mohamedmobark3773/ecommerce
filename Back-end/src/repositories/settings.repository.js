import BaseRepository from './base.repository.js';

class SettingsRepository extends BaseRepository {
  constructor() {
    super('settings');
  }
}

export const settingsRepository = new SettingsRepository();
export default settingsRepository;

