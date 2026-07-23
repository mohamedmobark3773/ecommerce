import BaseRepository from './base.repository.js';

class LanguageRepository extends BaseRepository {
  constructor() {
    super('language');
  }
}

export const languageRepository = new LanguageRepository();
export default languageRepository;

