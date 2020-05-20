import {
  html,
  storiesOf,
  withKnobs,
  color,
  withClassPropertiesKnobs
} from '@open-wc/demoing-storybook';

import WaybackSearch from '../index';

storiesOf('<hello-component>', module)
  .addDecorator(withKnobs)
  .add('Options', () => withClassPropertiesKnobs(WaybackSearch))
  .add('Styling', () => (
    html`
      <style>
        ia-wayback-search {
          --white: ${color('White', '#fff')};
          --grey20: ${color('Dark Grey', '#333')};
          --grey80: ${color('Light Grey', '#ccc')};

          --activeColor: var(--white);
          --iconFill: var(--grey60);
          --desktopSearchIconFill: var(--grey20);

          --themeFontFamily: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      </style>
      <ia-wayback-search
        .locationHandler="(url) => window.location = url"
        .waybackPagesArchived="32 trillion pages"
        .waybackHost="archive.org"
      ></ia-wayback-search>
    `
  ));
