import { html, fixture, expect } from '@open-wc/testing';
import '../../../src/assets/img/user';

describe('<user-image>', () => {
  it('toggles active class when property toggled', async () => {
    const icon = await fixture(html`<user-image></user-image>`);

    icon.active = true;
    await icon.updateComplete;

    const styleElement = icon.shadowRoot.querySelector('svg > path');

    expect(styleElement.classList.contains('active')).to.be.true;
  });
});
