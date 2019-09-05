import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { ScrubberBar } from '../src/scrubber-bar.js';

storiesOf('scrubber-bar', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(ScrubberBar))
  .add(
    'Alternative Title',
    () => html`
      <scrubber-bar></scrubber-bar>
    `,
  );
