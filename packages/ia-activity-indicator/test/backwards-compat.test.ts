import { expect, fixture, html } from '@open-wc/testing';

import '../ia-activity-indicator.js';

describe('IA Activity Indicator backwards compatibility import', () => {
  it('can import the top-level ia-activity-indicator.js file and get an indicator', async () => {
    const el = await fixture(html` <ia-activity-indicator></ia-activity-indicator> `);
    const container = el.shadowRoot?.querySelectorAll('div');
    expect(container?.length).to.equal(1);
  });
});
