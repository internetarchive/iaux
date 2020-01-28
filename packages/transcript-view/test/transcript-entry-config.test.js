import { expect } from '@open-wc/testing';

import TranscriptEntryConfig from '../lib/src/models/transcript-entry-config';
import TranscriptConfig from '../lib/src/models/transcript-config';

describe('TranscriptEntryConfig', () => {
  it('displays `[Transcript unavailable]` if it is a music section', async () => {
    const entry = new TranscriptEntryConfig(1, 64, 67, 'foo', true, undefined);
    expect(entry.displayText).to.equal('[Transcript unavailable]');
  });
});
