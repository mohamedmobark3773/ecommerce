import BaseQueue from './base.queue.js';

export class SearchIndexQueue extends BaseQueue {
  constructor(options = {}) {
    super('search-index', options);
  }
}

export default SearchIndexQueue;

