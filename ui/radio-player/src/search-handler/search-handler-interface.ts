import { TranscriptConfig } from '@internetarchive/transcript-view';

/**
 * Interface for defining Search Handler objects.
 *
 * Search Handlers are injected into the Radio Player to do the actual search work.
 */
export interface SearchHandlerInterface {
  /**
   * Execute a search and return a `Promise` containing a `TranscriptConfig` that
   * has been modified to include the search results.
   *
   * @param {string} query
   * @returns {Promise<TranscriptConfig>}
   * @memberof SearchHandlerInterface
   */
  search(query: string): Promise<TranscriptConfig>;
}
