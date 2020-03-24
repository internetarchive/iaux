import { FullTextSearchResponse } from './full-text-search-response';

/**
 * The `FullTextSearchDelegate` allows the `FullTextSearchBackend` to hand off
 * the network request to the consumer. This allows alternatives to AJAX calls
 * for other consumers like the DWeb project.
 */
export interface FullTextSearchDelegate {
  searchRequested(query: string): Promise<FullTextSearchResponse>;
}
