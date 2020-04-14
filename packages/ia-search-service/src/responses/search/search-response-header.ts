/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponseParams } from './search-response-params';

export class SearchResponseHeader {
  status: number;

  QTime: number;

  params: SearchResponseParams;

  constructor(json: any) {
    this.status = json.status;
    this.QTime = json.QTime;
    this.params = new SearchResponseParams(json.params);
  }
}
