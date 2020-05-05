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

import RadioPlayer from '../lib/src/donation-form';
import TranscriptEntryConfig from '../lib/src/models/transcript-entry-config';
import transcript from './transcript';

const convertedTranscript = transcript.map(entry => new TranscriptEntryConfig(
  entry.id, entry.start, entry.end, entry.text, entry.is_music || false, entry.search_match_index
));

storiesOf('donation-form', module)
  .addDecorator(withKnobs)
  .add('Transcript View', () => html`
    <donation-form
      showContextZones=true
      .currentTime=${number('Current Time', 22, 'Controls')}
      autoPlay=${boolean('Autoplay', true, 'Controls')}
      .entries=${convertedTranscript}>
    </donation-form>

    <style>
      body {
        background-color: black;
      }

      donation-form {
        height: 400px;
        --transcriptHeight: ${text('Transcript Height', '200px', 'Sizing')};
      }
    </style>
    `);
