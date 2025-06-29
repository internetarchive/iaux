import { html, fixture, expect } from '@open-wc/testing';

import '../src/wayback-slider';
import type { IATopNavLink } from '../src/models';

const component = ({
  archiveItLinks,
  browserExtensionsLinks,
  config,
  mobileAppsLinks,
}: {
  archiveItLinks: IATopNavLink[];
  browserExtensionsLinks: IATopNavLink[];
  config: Record<string, unknown>;
  mobileAppsLinks: IATopNavLink[];
}) => html`
  <wayback-slider
    baseHost="archive.org"
    .config=${config}
    .archiveItLinks=${archiveItLinks}
    .browserExtensionsLinks=${browserExtensionsLinks}
    .mobileAppsLinks=${mobileAppsLinks}
  ></wayback-slider>
`;

const buildDefaults = () => ({
  config: {},
  archiveItLinks: [
    {
      url: '1',
      title: 'first',
    },
    {
      url: '2',
      title: 'second',
    },
  ],
  browserExtensionsLinks: [
    {
      url: '3',
      title: 'third',
    },
    {
      url: '4',
      title: 'fourth',
    },
  ],
  mobileAppsLinks: [
    {
      url: '5',
      title: 'fifth',
    },
    {
      url: '6',
      title: 'sixth',
    },
  ],
});

describe('<wayback-slider>', () => {
  it('renders the links passed in via the archiveItLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot?.querySelectorAll('.archive-it a') ?? [];

    options.archiveItLinks.forEach((link, i) => {
      const anchor = anchors[i] as HTMLAnchorElement;
      expect(anchor.innerText).to.equal(link.title);
      expect(anchor.getAttribute('href')).to.contain(link.url);
    });
  });

  it('renders the links passed in via the browserExtensionsLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors =
      el.shadowRoot?.querySelectorAll('.browser-extensions a') ?? [];

    options.browserExtensionsLinks.forEach((link, i) => {
      const anchor = anchors[i] as HTMLAnchorElement;
      expect(anchor.innerText).to.equal(link.title);
      expect(anchor.getAttribute('href')).to.contain(link.url);
    });
  });

  it('renders the links passed in via the mobileAppsLinks prop', async () => {
    const options = buildDefaults();
    const el = await fixture(component(options));
    const anchors = el.shadowRoot?.querySelectorAll('.mobile-apps a') ?? [];

    options.mobileAppsLinks.forEach((link, i) => {
      const anchor = anchors[i] as HTMLAnchorElement;
      expect(anchor.innerText).to.equal(link.title);
      expect(anchor.getAttribute('href')).to.contain(link.url);
    });
  });
});
