import {
  storiesOf,
  html,
  withKnobs,
  color,
  text,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import AudioElement from '../index.js';

storiesOf('audio-element', module)
  .addDecorator(withKnobs)
  .add('Audio Element Options', () => withClassPropertiesKnobs(AudioElement, {
    template: html`
      <audio-element
        sources=${JSON.stringify([{"url": "./spring.mp3", "mimetype": "application/mpeg"}])}
      ></audio-element>
    `
  }));
