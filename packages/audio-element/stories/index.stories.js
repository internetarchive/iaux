import {
  storiesOf,
  html,
  withKnobs,
  color,
  text,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import { AudioElement } from '../index.js';
import springMp3 from './spring.mp3';

storiesOf('audio-element', module)
  .addDecorator(withKnobs)
  .add('Audio Element Options', () => withClassPropertiesKnobs(AudioElement, {
    template: html`
      <audio-element
        showControls=true
        sources=${JSON.stringify([{"url": springMp3, "mimetype": "audio/mpeg"}])}
      ></audio-element>

      <script>
        document.querySelector('audio-element').load();
      </script>
    `
  }));
