import {
  storiesOf,
  html,
  withKnobs,
  color,
  text,
  boolean,
  number,
  withClassPropertiesKnobs,
} from '@open-wc/demoing-storybook';

import RadioPlayer from '../lib/src/radio-player';
import TranscriptEntryConfig from '../lib/src/models/transcript-entry-config';
import transcript from './transcript';

const convertedTranscript = transcript.map(entry => new TranscriptEntryConfig(
  entry.id, entry.start, entry.end, entry.text, entry.is_music || false, entry.search_match_index
));

storiesOf('radio-player', module)
  .addDecorator(withKnobs)
  .add('Transcript View', () => html`
    <radio-player
      showContextZones=true
      .currentTime=${number('Current Time', 22, 'Controls')}
      autoPlay=${boolean('Autoplay', true, 'Controls')}
      .entries=${convertedTranscript}>
    </radio-player>

    <style>
      body {
        background-color: black;
      }

      radio-player {
        height: 400px;
        --transcriptHeight: ${text('Transcript Height', '200px', 'Sizing')};
      }
    </style>
    `);
