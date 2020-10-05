import {
  html,
  storiesOf,
  withKnobs,
  withClassPropertiesKnobs
} from '@open-wc/demoing-storybook';

import ZenDeskHelp from '../index';

storiesOf('<ia-zendesk-help-widget>', module)
  .addDecorator(withKnobs)
  .add('Options', () => withClassPropertiesKnobs(ZenDeskHelp))
  .add('Styling', () => (
    html`
      <ia-zendesk-help-widget
        widgetSrc="https://static.zdassets.com/ekr/snippet.js?key="
        widgetKey="685f6dc4-48c5-411f-8463-cc6dd50abe2d"
      ></ia-zendesk-help-widget>`
  ));
