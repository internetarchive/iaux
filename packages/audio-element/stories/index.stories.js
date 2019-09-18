import {
  storiesOf,
  html,
  withKnobs,
  color,
  text,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import WaveformProgress from '../index.js';

storiesOf('audio-element', module)
  .addDecorator(withKnobs)
  .add('Waveform Progress Options', () => withClassPropertiesKnobs(WaveformProgress, {
    template: html`
      <audio-element
        waveformUrl=${waveformImage}
        percentComplete=23
        interactive=true
        zonesOfSilence=${JSON.stringify([{ startPercent: 23, endPercent: 27 }, { startPercent: 58, endPercent: 60 }])}
        style="width: 100%; height: 10rem"
      ></audio-element>
    `
  }))
  .add(
    'Waveform Progress Styling',
    () => html`
      <style>
        audio-element {
          height: 10rem;
          width: 100%;
          --fillColor: ${color('Fill Color', 'purple', 'Colors')};
          --zoneOfSilenceColor: ${color('Zone of Silence Color', 'orange', 'Colors')};
        }
      </style>
      <audio-element
        waveformUrl=${waveformImage}
        percentComplete=23
        interactive=true
      ></audio-element>
    `,
  );
