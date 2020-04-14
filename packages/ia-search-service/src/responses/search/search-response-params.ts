/* eslint-disable @typescript-eslint/no-explicit-any */
export class SearchResponseParams {
  query: string;

  qin: string;

  fields: string;

  wt: string;

  sort: string;

  rows: string;

  start: number;

  constructor(json: any) {
    this.query = json.query;
    this.qin = json.qin;
    this.fields = json.fields;
    this.wt = json.wt;
    this.sort = json.sort;
    this.rows = json.rows;
    this.start = json.start;
  }
}
