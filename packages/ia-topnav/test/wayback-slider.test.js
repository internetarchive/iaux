import { html, fixture, expect } from '@open-wc/testing';

import '../src/wayback-slider';

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
    url: '1',
    title: 'first'
  }, {
    url: '2',
    title: 'second'
  }],
  toolsLinks: [{
    url: '3',
    title: 'third'
  }, {
    url: '4',
    title: 'fourth'
  }]
});

describe('<wayback-slider>', () => {
  it('renders the links passed in via the archiveItLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot.querySelectorAll('.archive-it a');

    options.archiveItLinks.forEach((link, i) => {
      expect(anchors[i].innerText).to.equal(link.title);
      expect(anchors[i].getAttribute('href')).to.equal(link.url);
    });
  });

  it('renders the links passed in via the toolsLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot.querySelectorAll('.tools a');

    options.toolsLinks.forEach((link, i) => {
      expect(anchors[i].innerText).to.equal(link.title);
      expect(anchors[i].getAttribute('href')).to.equal(link.url);
    });
  });
});
