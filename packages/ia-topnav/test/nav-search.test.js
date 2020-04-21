import {
  html,
  fixture,
  expect,
} from '@open-wc/testing';

import '../src/nav-search';

const component = html`<nav-search></nav-search>`;

describe('<nav-search>', () => {
  it('defaults to closed', async () => {
    const el = await fixture(component);

    expect(el.open).to.be.false;
  });

  it('does not allow search form to submit if query empty', async () => {
    const el = await fixture(component);

    const result = el.search({
      preventDefault: () => {}
    });

    expect(result).to.be.false;
  });
});
