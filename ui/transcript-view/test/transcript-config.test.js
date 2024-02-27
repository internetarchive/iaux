import {
  html, fixture, expect, oneEvent
} from '@open-wc/testing';

import TranscriptEntryConfig from '../lib/src/models/transcript-entry-config';
import TranscriptConfig from '../lib/src/models/transcript-config';

describe('TranscriptConfig', () => {
  it('properly filters searchResults', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', false, undefined);
    const entry2 = new TranscriptEntryConfig(2, 68, 73, 'bar', false, 1);
    const entry3 = new TranscriptEntryConfig(3, 74, 78, 'baz', false, undefined);
    const config = new TranscriptConfig([entry1, entry2, entry3]);

    expect(config.searchResults.length).to.equal(1);
    expect(config.searchResults[0].displayText).to.equal('bar');
  });
});
