import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { ScrubberBar } from '../src/ScrubberBar.js';
import '../scrubber-bar.js';

storiesOf('scrubber-bar', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(ScrubberBar))
  .add(
    'Alternative Title',
    () => html`
      <scrubber-bar .title=${'Something else'}></scrubber-bar>
    `,
  );
