export class SearchParams {
  query: string;
  sort: string[];
  rows: number;
  start: number;
  fields: string[];

  constructor(
    query: string,
    sort: string[] = [],
    rows: number = 25,
    start: number = 0,
    fields: string[] = ["identifier"],
  ) {
    this.query = query;
    this.sort = sort;
    this.rows = rows;
    this.start = start;
    this.fields = fields;
  }

  get fieldsAsString(): string {
    return this.fields.join(",");
  }

  get asUrlSearchParams(): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    params.append("q", this.query);
    params.append("rows", String(this.rows));
    params.append("page", String(this.start));
    params.append("output", "json");

    this.fields.forEach(field => {
      params.append("fl[]", field);
    });

    this.sort.forEach(sort => {
      params.append("sort[]", sort);
    });

    return params;
  }
}
