import { expect } from '@open-wc/testing';

import { SearchParams } from '../lib/search-params';

describe('SearchParams', () => {
  it('can be instantiated with just a query', async () => {
    const query = "title:foo AND collection:bar"
    const params = new SearchParams(query)
    expect(params.query).to.equal(query);
  });

  it('can be instantiated with query params and fields', async () => {
    const query = "title:foo AND collection:bar"
    const fields = ["identifier", "foo", "bar"];
    const params = new SearchParams(query, undefined, undefined, undefined, fields);
    expect(params.fields).to.deep.equal(fields);
  });

  it('can return the fields as a string', async () => {
    const query = "title:foo AND collection:bar"
    const fields = ["identifier", "foo", "bar"];
    const params = new SearchParams(query, undefined, undefined, undefined, fields);
    const fieldsAsString = fields.join(',');
    expect(fieldsAsString).to.equal("identifier,foo,bar");
  });

  it('properly generates a URLSearchParam with just a query', async () => {
    const query = "title:foo AND collection:bar";
    const params = new SearchParams(query);
    const urlSearchParam = params.asUrlSearchParams;
    const queryAsString = urlSearchParam.toString();
    const expected = "q=title%3Afoo+AND+collection%3Abar&rows=25&page=0&output=json&fl%5B%5D=identifier"
    expect(queryAsString).to.equal(expected);
  });

  it('properly generates a URLSearchParam with a query and fields', async () => {
    const query = "title:foo AND collection:bar";
    const fields = ["identifier", "foo", "bar"];
    const params = new SearchParams(query, undefined, undefined, undefined, fields);
    const urlSearchParam = params.asUrlSearchParams;
    const queryAsString = urlSearchParam.toString();
    const expected = "q=title%3Afoo+AND+collection%3Abar&rows=25&page=0&output=json&fl%5B%5D=identifier&fl%5B%5D=foo&fl%5B%5D=bar"
    expect(queryAsString).to.equal(expected);
  });

  it('properly generates a URLSearchParam with a query, sort, row, start, and fields', async () => {
    const query = "title:foo AND collection:bar";
    const fields = ["identifier", "foo", "bar"];
    const sort = ["downloads desc"];
    const params = new SearchParams(query, sort, 53, 27, fields);
    const urlSearchParam = params.asUrlSearchParams;
    const queryAsString = urlSearchParam.toString();
    const expected = "q=title%3Afoo+AND+collection%3Abar&rows=53&page=27&output=json&fl%5B%5D=identifier&fl%5B%5D=foo&fl%5B%5D=bar&sort%5B%5D=downloads+desc"
    expect(queryAsString).to.equal(expected);
  });
});
