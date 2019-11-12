import { expect } from '@open-wc/testing';
import { AudioSource } from '@internetarchive/audio-element';

import RadioPlayerConfig from '../lib/src/models/radio-player-config';

describe('Radio Player Config', () => {
  it('can be instantiated', async () => {
    const source1 = new AudioSource('http://foo.bar/foo.mp3', 'audio/mpeg');
    const source2 = new AudioSource('http://foo.bar/foo.ogg', 'audio/ogg');

    const config = new RadioPlayerConfig(
      'foo',
      '2019-10-29',
      'http://foo.bar/image.jpg',
      'http://bar.foo/waveform.png',
      [source1, source2],
      ['foo', 'bar', 'baz']
    )

    expect(config.title).to.equal('foo');
    expect(config.date).to.equal('2019-10-29');
    expect(config.logoUrl).to.equal('http://foo.bar/image.jpg');
    expect(config.waveformUrl).to.equal('http://bar.foo/waveform.png');
    expect(config.audioSources).to.eql([source1, source2]);
    expect(config.quickSearches).to.eql(['foo', 'bar', 'baz']);
  });

  it('quicksearches are empty if none passed in', async () => {
    const source1 = new AudioSource('http://foo.bar/foo.mp3', 'audio/mpeg');
    const source2 = new AudioSource('http://foo.bar/foo.ogg', 'audio/ogg');

    const config = new RadioPlayerConfig(
      'foo',
      '2019-10-29',
      'http://foo.bar/image.jpg',
      'http://bar.foo/waveform.png',
      [source1, source2]
    )

    expect(config.quickSearches).to.eql([]);
  });
});
