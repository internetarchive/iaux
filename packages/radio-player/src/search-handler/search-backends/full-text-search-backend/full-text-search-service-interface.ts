import { FullTextSearchResponse } from './full-text-search-response';

/**
 * The `FullTextSearchServiceInterface` allows the `FullTextSearchBackend` to hand off
 * the network request to the consumer. This allows alternatives to AJAX calls
 * for other consumers like the DWeb project.
 */
export interface FullTextSearchServiceInterface {
  /**
   * Execute the search and return a Promise with a FullTextSearchResponse.
   *
   * @param {string} query
   * @returns {Promise<FullTextSearchResponse>}
   * @memberof FullTextSearchServiceInterface
   */
  searchRequested(query: string): Promise<FullTextSearchResponse>;
}
