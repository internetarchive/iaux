import { SearchResponse } from './models/search-response';
import { SearchBackendInterface } from './search-backend-interface';
import { SearchParams } from './search-params';

export class SearchService {
  private searchExecutor: SearchBackendInterface;

  constructor(searchExecutor: SearchBackendInterface) {
    this.searchExecutor = searchExecutor;
  }

  async search(params: SearchParams): Promise<SearchResponse> {
    const rawResponse = await this.searchExecutor.performSearch(params);
    const modeledResponse = new SearchResponse(rawResponse);
    return new Promise(resolve => resolve(modeledResponse));
  }
}
