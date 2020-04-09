import { SearchResponse } from './models/search-response';
import { SearchBackendInterface } from './search-backend-interface';
import { SearchParams } from './search-params';

export class SearchService {
  private searchBackend: SearchBackendInterface;

  constructor(searchBackend: SearchBackendInterface) {
    this.searchBackend = searchBackend;
  }

  async search(params: SearchParams): Promise<SearchResponse> {
    const rawResponse = await this.searchBackend.performSearch(params);
    const modeledResponse = new SearchResponse(rawResponse);
    return new Promise(resolve => resolve(modeledResponse));
  }
}
