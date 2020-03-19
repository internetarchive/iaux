import { FullTextSearchResponse } from './full-text-search-response';

export interface FullTextSearchDelegate {
  searchRequested(query: string): Promise<FullTextSearchResponse>;
}
