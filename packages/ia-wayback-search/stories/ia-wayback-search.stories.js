import {
  html,
  storiesOf,
  withKnobs,
  color,
  withClassPropertiesKnobs
} from '@open-wc/demoing-storybook';

import WaybackSearch from '../index';

storiesOf('<ia-wayback-search>', module)
  .addDecorator(withKnobs)
  .add('Options', () => withClassPropertiesKnobs(WaybackSearch))
  .add('Styling', () => (
    html`
      <style>
        html {
          font-size: 10px;
        }
        body {
          margin: 0;
          padding: 2rem;
          --white: ${color('White', '#fff')};
          --grey20: ${color('Dark Grey', '#333')};
          --grey80: ${color('Light Grey', '#ccc')};
          color: var(--white);
          background: var(--grey20);
        }
        ia-wayback-search {
          --activeColor: var(--white);
          --iconFill: var(--grey60);
          --desktopSearchIconFill: var(--grey20);

          --themeFontFamily: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      </style>
      <ia-wayback-search
        waybackPagesArchived="32 trillion pages"
        waybackHost="archive.org"
      ></ia-wayback-search>
    `
  ));
