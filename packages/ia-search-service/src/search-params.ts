/**
 * SearchParams provides an encapsulation to all of the search parameters
 * available for searching.
 *
 * It also provides an `asUrlSearchParams` helper method for converting the
 * parameters to an IA-style query string. ie. it converts the `fields` array
 * to `fl[]=identifier&fl[]=collection` and `sort` to `sort[]=date+desc&sort[]=downloads+asc`
 */
export class SearchParams {
  query: string;

  sort: string[];

  rows: number;

  start: number;

  fields: string[];

  constructor(
    query: string,
    sort: string[] = [],
    rows = 25,
    start = 0,
    fields: string[] = ['identifier'],
  ) {
    this.query = query;
    this.sort = sort;
    this.rows = rows;
    this.start = start;
    this.fields = fields;
  }

  /**
   * Return a URLSearchParams representation of the parameters for use in network requests.
   *
   * @readonly
   * @type {URLSearchParams}
   * @memberof SearchParams
   */
  get asUrlSearchParams(): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    params.append('q', this.query);
    params.append('rows', String(this.rows));
    params.append('page', String(this.start));
    params.append('output', 'json');

    this.fields.forEach(field => {
      params.append('fl[]', field);
    });

    this.sort.forEach(sort => {
      params.append('sort[]', sort);
    });

    return params;
  }
}
