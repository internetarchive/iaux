import { FullTextSearchServiceInterface } from '../src/search-handler/search-backends/full-text-search-backend/full-text-search-service-interface';
import { FullTextSearchResponse } from '../src/search-handler/search-backends/full-text-search-backend/full-text-search-response';

/**
 * An example FullTextSearchService that fetches data from the backend and
 * returns a Promise<FullTextSearch> response.
 */
export class FullTextSearchService implements FullTextSearchServiceInterface {
  private itemId: string;

  private baseUrl: string;

  private searchServicePath: string;

  constructor(itemId: string, baseUrl: string, searchServicePath: string) {
    this.itemId = itemId;
    this.baseUrl = baseUrl;
    this.searchServicePath = searchServicePath;
  }

  /** @inheritdoc */
  async searchRequested(query: string): Promise<FullTextSearchResponse> {
    const searchUrl = `${this.baseUrl}${this.searchServicePath}`;
    const queryParams = `?q=${query}&identifier=${this.itemId}&number_of_fragments=1000&scope=all`;
    const url = `${searchUrl}${queryParams}`;
    const rawResponse = await fetch(url);
    const jsonResponse = await rawResponse.json();
    const modeledResponse = new FullTextSearchResponse(jsonResponse);

    return new Promise(resolve => resolve(modeledResponse));
  }
}
