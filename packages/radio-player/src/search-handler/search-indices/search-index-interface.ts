import { Range } from '../search-models';

export interface SearchIndexInterface {
  getSearchRanges(term: string): Promise<Range[]>;
}
