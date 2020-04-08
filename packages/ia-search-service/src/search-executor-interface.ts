import { SearchParams } from "./search-params";

export interface SearchExecutor {
  executeSearch(params: SearchParams): Promise<any>
}
