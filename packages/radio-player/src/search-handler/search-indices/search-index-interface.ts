import { Range } from '../search-models';

export interface SearchIndexInterface {
  getSearchRanges(query: string): Promise<Range[]>;
}
