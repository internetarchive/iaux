import { SearchResponse } from './responses/search/search-response';
import { SearchBackendInterface } from './search-backend-interface';
import { SearchParams } from './search-params';
import { MetadataResponse } from './responses/metadata/metadata-response';

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

  async fetchMetadata(identifier: string): Promise<MetadataResponse> {
    const rawResponse = await this.searchBackend.fetchMetadata(identifier);
    const modeledResponse = new MetadataResponse(rawResponse);
    return new Promise(resolve => resolve(modeledResponse));
  }
}
