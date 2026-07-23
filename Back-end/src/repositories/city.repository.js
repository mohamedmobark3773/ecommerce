import BaseRepository from './base.repository.js';

class CityRepository extends BaseRepository {
  constructor() {
    super('city');
  }
}

export const cityRepository = new CityRepository();
export default cityRepository;

