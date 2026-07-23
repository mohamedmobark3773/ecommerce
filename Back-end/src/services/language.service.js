import BaseService from './base.service.js';
import { languageRepository } from '../repositories/language.repository.js';

class LanguageService extends BaseService {
  constructor() {
    super(languageRepository, 'language');
  }
}

export const languageService = new LanguageService();
export default languageService;

