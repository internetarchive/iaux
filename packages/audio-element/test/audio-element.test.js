import {
  html, fixture, expect, oneEvent
} from '@open-wc/testing';

import '../lib/audio-element.js';
import AudioSource from '../lib/models/audio-source.js';

describe('Audio Element', () => {
  it('does not have any sources by default', async () => {
    const el = await fixture(html`
      <audio-element></audio-element>
    `);

    const sources = el.shadowRoot.querySelectorAll('source');
    expect(sources.length).to.equal(0);
  });

  it('configures sources properly when they are provided', async () => {
    const audio1 = new AudioSource('./assets/arrow.ogg', 'audio/ogg');
    const audio2 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audio1, audio2];
    const el = await fixture(html`
      <audio-element
        sources=${JSON.stringify(audioSources)}
      ></audio-element>
    `);

    const sources = el.shadowRoot.querySelectorAll('source');
    expect(sources.length).to.equal(2);

    const firstSource = sources[0];
    const secondSource = sources[1];
    expect(firstSource.src.endsWith('arrow.ogg')).to.be.true;
    expect(secondSource.src.endsWith('arrow.mp3')).to.be.true;
  });

  it('emits `playbackStarted` event when audio starts playing', async () => {
    const audio1 = new AudioSource('./assets/arrow.ogg', 'audio/ogg');
    const audio2 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audio1, audio2];
    const el = await fixture(html`
      <audio-element
        sources=${JSON.stringify(audioSources)}
      ></audio-element>
    `);

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { el.play(); });
    const response = await oneEvent(el, 'playbackStarted');
    expect(response).to.exist;
  });

  it('emits `playbackPaused` event when audio gets paused', async () => {
    const audio1 = new AudioSource('./assets/arrow.ogg', 'audio/ogg');
    const audio2 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audio1, audio2];
    const el = await fixture(html`
      <audio-element
        sources=${JSON.stringify(audioSources)}
      ></audio-element>
    `);

    el.play();

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { el.pause(); });
    const response = await oneEvent(el, 'playbackPaused');
    expect(response).to.exist;
  });

  it('emits `canplay` event when audio starts playing', async () => {
    const audio1 = new AudioSource('./assets/arrow.ogg', 'audio/ogg');
    const audio2 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audio1, audio2];
    const el = await fixture(html`
      <audio-element
        sources=${JSON.stringify(audioSources)}
      ></audio-element>
    `);

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { el.play(); });
    const response = await oneEvent(el, 'canplay');
    expect(response).to.exist;
  });

  it('shows controls if set', async () => {
    const el = await fixture(html`
      <audio-element showControls=true></audio-element>
    `);
    const audioTag = el.shadowRoot.querySelector('audio');
    expect(audioTag.controls).to.equal(true);
  });

  it('shows does not show controls by default', async () => {
    const el = await fixture(html`
      <audio-element></audio-element>
    `);
    const audioTag = el.shadowRoot.querySelector('audio');
    expect(audioTag.controls).to.equal(false);
  });

  function promisedSleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  it('can set the volume properly', async () => {
    const el = await fixture(html`
      <audio-element></audio-element>
    `);
    const audioTag = el.shadowRoot.querySelector('audio');
    el.volume = 0.5;
    await promisedSleep(0.5);
    expect(audioTag.volume).to.equal(0.5);
  });

  it('can load the track', async () => {
    const audio1 = new AudioSource('./assets/arrow.ogg', 'audio/ogg');
    const audio2 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audio1, audio2];
    const el = await fixture(html`
      <audio-element
        sources=${JSON.stringify(audioSources)}
      ></audio-element>
    `);
    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { el.load(); });
    const response = await oneEvent(el, 'canplay');
    expect(response).to.exist;
  });

  it('can seek to time in the track', async () => {
    const audio1 = new AudioSource('./assets/arrow.ogg', 'audio/ogg');
    const audio2 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audio1, audio2];
    const el = await fixture(html`
      <audio-element
        sources=${JSON.stringify(audioSources)}
      ></audio-element>
    `);
    el.seekTo(0.7);
    const audioTag = el.shadowRoot.querySelector('audio');
    expect(audioTag.currentTime).to.equal(0.7);
  });


  it('can seek by time in the track', async () => {
    const audio1 = new AudioSource('./assets/arrow.ogg', 'audio/ogg');
    const audio2 = new AudioSource('./assets/arrow.mp3', 'audio/mpeg');
    const audioSources = [audio1, audio2];
    const el = await fixture(html`
      <audio-element
        sources=${JSON.stringify(audioSources)}
      ></audio-element>
    `);
    el.seekBy(0.2);
    const audioTag = el.shadowRoot.querySelector('audio');
    expect(audioTag.currentTime).to.equal(0.2);
  });
});
