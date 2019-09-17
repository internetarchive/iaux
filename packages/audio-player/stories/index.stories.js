import {
  storiesOf,
  html,
  withKnobs,
  color,
  text,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import WaveformProgress from '../index.js';
import waveformImage from './waveform.png';

storiesOf('audio-player', module)
  .addDecorator(withKnobs)
  .add('Waveform Progress Options', () => withClassPropertiesKnobs(WaveformProgress, {
    template: html`
      <audio-player
        waveformUrl=${waveformImage}
        percentComplete=23
        interactive=true
        zonesOfSilence=${JSON.stringify([{startPercent: 23, endPercent: 27}, {startPercent: 58, endPercent: 60}])}
        style="width: 100%; height: 10rem"
      ></audio-player>
    `
  }))
  .add(
    'Waveform Progress Styling',
    () => html`
      <style>
        audio-player {
          height: 10rem;
          width: 100%;
          --fillColor: ${color('Fill Color', 'purple', 'Colors')};
          --zoneOfSilenceColor: ${color('Zone of Silence Color', 'orange', 'Colors')};
        }
      </style>
      <audio-player
        waveformUrl=${waveformImage}
        percentComplete=23
        interactive=true
      ></audio-player>
    `,
  );
