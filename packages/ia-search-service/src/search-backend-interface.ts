/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchParams } from './search-params';

export interface SearchBackendInterface {
  performSearch(params: SearchParams): Promise<any>;
}
