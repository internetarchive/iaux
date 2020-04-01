import { Range } from '../search-models';

/**
 * An interface to define the responsibilities of the SearchBackend.
 *
 * Search Backends are injected into the SearchHandler for different cases (offline, online, etc)
 */
export interface SearchBackendInterface {
  getSearchRanges(query: string): Promise<Range[]>;
}
