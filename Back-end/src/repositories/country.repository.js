import BaseRepository from './base.repository.js';

class CountryRepository extends BaseRepository {
  constructor() {
    super('country');
  }
}

export const countryRepository = new CountryRepository();
export default countryRepository;

