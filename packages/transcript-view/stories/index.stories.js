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

import TranscriptView from '../lib/src/transcript-view';
import TranscriptEntryConfig from '../lib/src/models/transcript-entry-config';
import transcript from './transcript';

const convertedTranscript = transcript.map((entry) => {
  return new TranscriptEntryConfig(
    entry.id, entry.start, entry.end, entry.text, entry.is_music || false, entry.search_match_index);
})

console.log(convertedTranscript);

storiesOf('transcript-view', module)
  .addDecorator(withKnobs)
  .add('Transcript View', () => html`
    <transcript-view
      showContextZones=true
      .currentTime=${number('Current Time', 22, 'Controls')}
      autoPlay=${boolean('Autoplay', true, 'Controls')}
      .entries=${convertedTranscript}>
    </transcript-view>

    <style>
      body {
        background-color: black;
      }

      transcript-view {
        height: 400px;
        --transcriptHeight: ${text('Transcript Height', '200px', 'Sizing')};
      }
    </style>
    `
  );
