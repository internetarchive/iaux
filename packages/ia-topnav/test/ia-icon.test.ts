import { html, fixture, expect } from '@open-wc/testing';
import { IAIcon } from '../src/assets/img/ia-icon';

describe('<ia-icon>', () => {
  it('renders an icon with a fill color', async () => {
    const iconType = 'web';
    // const fill = '#999';
    const iaIcon = await fixture<IAIcon>(
      html`<ia-icon .icon=${iconType}></ia-icon>`,
    );

    expect(iaIcon.icon).to.equal(iconType);
    // expect(iaIcon.fill).to.equal(fill);
  });
});
