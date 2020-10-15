import { html, fixture, expect } from '@open-wc/testing';

import '../src/wayback-slider';

const component = ({
  archiveItLinks,
  browserExtensionsLinks,
  config,
  mobileAppsLinks
}) => (
  html`
    <wayback-slider
      .baseHost='archive.org'
      .config=${config}
      .archiveItLinks=${archiveItLinks}
      .browserExtensionsLinks=${browserExtensionsLinks}
      .mobileAppsLinks=${mobileAppsLinks}
    ></wayback-slider>
  `
);

const buildDefaults = () => ({
  config: {},
  archiveItLinks: [{
    url: '1',
    title: 'first'
  }, {
    url: '2',
    title: 'second'
  }],
  browserExtensionsLinks: [{
    url: '3',
    title: 'third'
  }, {
    url: '4',
    title: 'fourth'
  }],
  mobileAppsLinks: [{
    url: '5',
    title: 'fifth'
  }, {
    url: '6',
    title: 'sixth'
  }]
});

describe('<wayback-slider>', () => {
  it('renders the links passed in via the archiveItLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot.querySelectorAll('.archive-it a');

    options.archiveItLinks.forEach((link, i) => {
      expect(anchors[i].innerText).to.equal(link.title);
      expect(anchors[i].getAttribute('href')).to.contain(link.url);
    });
  });

  it('renders the links passed in via the browserExtensionsLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot.querySelectorAll('.browser-extensions a');

    options.browserExtensionsLinks.forEach((link, i) => {
      expect(anchors[i].innerText).to.equal(link.title);
      expect(anchors[i].getAttribute('href')).to.contain(link.url);
    });
  });

  it('renders the links passed in via the mobileAppsLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot.querySelectorAll('.mobile-apps a');

    options.mobileAppsLinks.forEach((link, i) => {
      expect(anchors[i].innerText).to.equal(link.title);
      expect(anchors[i].getAttribute('href')).to.contain(link.url);
    });
  });
});
