import { SearchResponse } from "./models/searchResponse";
import { SearchExecutor } from "./search-executor-interface";
import { SearchParams } from "./search-params";

export class SearchService {
  private searchExecutor: SearchExecutor;

  constructor(searchExecutor: SearchExecutor) {
    this.searchExecutor = searchExecutor;
  }

  async search(params: SearchParams): Promise<SearchResponse> {
    const rawResponse = await this.searchExecutor.executeSearch(params);
    const modeledResponse = new SearchResponse(rawResponse);
    return new Promise(resolve => resolve(modeledResponse));
  }
}
