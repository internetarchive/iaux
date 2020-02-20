import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/assets/img/ia-icon';

describe('<ia-icon>', () => {
  it('renders an icon with a fill color', async () => {
    const iconType = 'web';
    const fill = '#999';
    const iaIcon = await fixture(html`<ia-icon .icon=${iconType} .fill=${fill}></ia-icon>`);

    expect(iaIcon.icon).to.equal(iconType);
    expect(iaIcon.fill).to.equal(fill);
  });
});
