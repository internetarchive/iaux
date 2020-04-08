export class SearchParams {
  query: string;
  sort?: string;
  rows: number;
  start: number;
  fields: string[];

  constructor(
    query: string,
    rows: number = 25,
    start: number = 0,
    fields: string[] = ["identifier"],
    sort?: string
  ) {
    this.query = query;
    this.sort = sort;
    this.rows = rows;
    this.start = start;
    this.fields = fields;
  }

  get asUrlSearchParams(): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    params.append("q", this.query);
    params.append("rows", String(this.rows));
    params.append("page", String(this.start));
    params.append("output", "json");

    this.fields.forEach(field => {
      params.append("field[]", field);
    });

    if (this.sort) {
      params.append("sort", this.sort);
    }
    return params;
  }
}
