import { SearchResponse } from './responses/search/search-response';
import { SearchBackendInterface } from './search-backend-interface';
import { SearchParams } from './search-params';
import { MetadataResponse } from './responses/metadata/metadata-response';

/**
 * The Search Service is responsible for taking the raw response provided by
 * the Search Backend and modeling it as a `SearchResponse` or `MetadataResponse`
 * object, depending on the type of response.
 */
export class SearchService {
  private searchBackend: SearchBackendInterface;

  constructor(searchBackend: SearchBackendInterface) {
    this.searchBackend = searchBackend;
  }

  /**
   * Perform a search with the given parameters.
   *
   * @param params SearchParams
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    const rawResponse = await this.searchBackend.performSearch(params);
    const modeledResponse = new SearchResponse(rawResponse);
    return new Promise(resolve => resolve(modeledResponse));
  }

  /**
   * Fetch the item's metadata.
   *
   * @param identifier string
   */
  async fetchMetadata(identifier: string): Promise<MetadataResponse> {
    const rawResponse = await this.searchBackend.fetchMetadata(identifier);
    const modeledResponse = new MetadataResponse(rawResponse);
    return new Promise(resolve => resolve(modeledResponse));
  }
}
