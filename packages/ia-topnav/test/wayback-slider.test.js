import { html, fixture, expect } from '@open-wc/testing';

import '../src/wayback-slider';
import { wayback } from '../src/data/menus';

const component = ({ archiveItLinks, config, toolsLinks }) => (
  html`
    <wayback-slider
      .config=${config}
      .archiveItLinks=${archiveItLinks}
      .toolsLinks=${toolsLinks}
    ></wayback-slider>
  `
);

const buildDefaults = () => ({
  config: { baseHost: 'archive.org' },
  archiveItLinks: [{
    href: '1',
    text: 'first'
  }, {
    href: '2',
    text: 'second'
  }],
  toolsLinks: [{
    href: '3',
    text: 'third'
  }, {
    href: '4',
    text: 'fourth'
  }]
});

describe('<wayback-slider>', () => {
  it('renders the links passed in via the archiveItLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot.querySelectorAll('.archive-it a');

    options.archiveItLinks.forEach((link, i) => {
      expect(anchors[i].innerText).to.equal(link.text);
      expect(anchors[i].getAttribute('href')).to.equal(link.href);
    });
  });

  it('renders the links passed in via the toolsLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot.querySelectorAll('.tools a');

    options.toolsLinks.forEach((link, i) => {
      expect(anchors[i].innerText).to.equal(link.text);
      expect(anchors[i].getAttribute('href')).to.equal(link.href);
    });
  });
});
