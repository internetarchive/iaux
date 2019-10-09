import {
  storiesOf,
  html,
  withKnobs,
  color,
  text,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import { WaveformProgress } from '../index.js';
import waveformImage from './waveform.png';

storiesOf('waveform-progress', module)
  .addDecorator(withKnobs)
  .add('Waveform Progress Options', () => withClassPropertiesKnobs(WaveformProgress, {
    template: html`
      <waveform-progress
        waveformUrl=${waveformImage}
        percentComplete=23
        interactive=true
        zonesOfSilence=${JSON.stringify([{startPercent: 23, endPercent: 27}, {startPercent: 58, endPercent: 60}])}
        style="width: 100%; height: 10rem"
      ></waveform-progress>
    `
  }))
  .add(
    'Waveform Progress Styling',
    () => html`
      <style>
        waveform-progress {
          height: 10rem;
          width: 100%;
          --fillColor: ${color('Fill Color', 'purple', 'Colors')};
          --zoneOfSilenceColor: ${color('Zone of Silence Color', 'orange', 'Colors')};
        }
      </style>
      <waveform-progress
        waveformUrl=${waveformImage}
        percentComplete=23
        zonesOfSilence=${JSON.stringify([
          {startPercent: 23, endPercent: 27},
          {startPercent: 45, endPercent: 47},
          {startPercent: 58, endPercent: 65},
          {startPercent: 81, endPercent: 89}])}
        interactive=true
      ></waveform-progress>
    `,
  );
