import { SearchResponse } from './models/search-response';
import { SearchBackendInterface } from './search-backend-interface';
import { SearchParams } from './search-params';
import { Metadata } from './models/metadata';

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

  async fetchMetadata(identifier: string): Promise<Metadata> {
    const rawResponse = await this.searchBackend.fetchMetadata(identifier);
    const modeledResponse = new Metadata(rawResponse);
    return new Promise(resolve => resolve(modeledResponse));
  }
}
