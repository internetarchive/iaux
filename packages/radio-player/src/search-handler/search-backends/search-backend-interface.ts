import { Range } from '../search-models';

export interface SearchBackendInterface {
  getSearchRanges(query: string): Promise<Range[]>;
}
