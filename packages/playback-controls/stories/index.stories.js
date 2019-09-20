import {
  storiesOf,
  html,
  withKnobs,
  color,
  text,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import '../playback-controls';

storiesOf('playback-controls', module)
  .addDecorator(withKnobs)
  .add(
    'Scrubber Bar',
    () => html`
      <playback-controls></playback-controls>
      <style>
        body {
          background-color: black;
        }
      </style>
    `,
  );
