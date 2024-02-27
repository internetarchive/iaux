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

import RadioPlayer from '../lib/src/expandable-search-bar';
import TranscriptEntryConfig from '../lib/src/models/transcript-entry-config';
import transcript from './transcript';

const convertedTranscript = transcript.map((entry) => {
  return new TranscriptEntryConfig(
    entry.id, entry.start, entry.end, entry.text, entry.is_music || false, entry.search_match_index);
});

storiesOf('expandable-search-bar', module)
  .addDecorator(withKnobs)
  .add('Transcript View', () => html`
    <expandable-search-bar>
    </expandable-search-bar>

    <style>
      body {
        background-color: black;
      }

      expandable-search-bar {
        height: 400px;
        --transcriptHeight: ${text('Transcript Height', '200px', 'Sizing')};
      }
    </style>
    `
  );
