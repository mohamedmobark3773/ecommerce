export class SearchDTO {
  constructor(result) {
    this.query = result.query;
    this.results = result.results || [];
    this.total = result.total || 0;
    this.page = result.page || 1;
    this.limit = result.limit || 20;
  }

  static transform(result) {
    if (!result) return null;
    return new SearchDTO(result);
  }
}

