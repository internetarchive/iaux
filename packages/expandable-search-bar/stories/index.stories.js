import {
  storiesOf,
  html,
  withKnobs,
  text
} from '@open-wc/demoing-storybook';

import TranscriptEntryConfig from '../../transcript-view/lib/src/models/transcript-entry-config';
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
