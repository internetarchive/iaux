import {
  html,
  storiesOf,
  withKnobs,
  color,
  withClassPropertiesKnobs
} from '@open-wc/demoing-storybook';

import ZenDeskHelp from '../index';

storiesOf('<ia-zendesk-help-widget>', module)
  .addDecorator(withKnobs)
  .add('Options', () => withClassPropertiesKnobs(ZenDeskHelp))
  .add('Styling', () => (
    html`
      <style>
        ia-zendesk-help-widget {
          --activeColor: var(--white);
          --iconFill: var(--grey60);
          --desktopSearchIconFill: var(--grey20);

          --themeFontFamily: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      </style>
      <ia-zendesk-help-widget
        widgetSrc="https://static.zdassets.com/ekr/snippet.js?key=685f6dc4-48c5-411f-8463-cc6dd50abe2d"
      ></ia-zendesk-help-widget>
    `
  ));
