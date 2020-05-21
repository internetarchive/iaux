import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import '../lib/donation-form';

describe('Donation Form', () => {
  describe('Configuration', () => {
    it('has no configuration', async () => {
      const el = await fixture(html`
        <donation-form></donation-form>
      `);

      expect(el.braintreeManager).to.equal(undefined);
    });
  });
});
