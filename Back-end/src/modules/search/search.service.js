import { searchRepository } from "./search.repository.js";
import { SearchDTO } from "./search.dto.js";

class SearchService {
  async search(query = {}) {
    const searchQuery = query.q || query.search || "";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    const result = await searchRepository.search(searchQuery, { page, limit });
    return SearchDTO.transform({
      query: searchQuery,
      results: result.results,
      total: result.total,
      page,
      limit,
    });
  }
}

export const searchService = new SearchService();

