import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import { PlaybackControls, PlaybackMode } from '../index';

describe('PlaybackControls', () => {
  it('defaults to paused', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    expect(el.playbackMode).to.equal(PlaybackMode.paused);
  });

  it('switches to play mode when play pause button pressed', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const playPauseBtn = el.shadowRoot.getElementById('play-pause-btn');
    const clickEvent = new MouseEvent('click');
    playPauseBtn.dispatchEvent(clickEvent);

    expect(el.playbackMode).to.equal(PlaybackMode.playing);
  });

  it('switches to paused mode when play pause button pressed if it is playing', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const playPauseBtn = el.shadowRoot.getElementById('play-pause-btn');
    const clickEvent = new MouseEvent('click');
    playPauseBtn.dispatchEvent(clickEvent);
    playPauseBtn.dispatchEvent(clickEvent);
    expect(el.playbackMode).to.equal(PlaybackMode.paused);
  });

  it('emits an event when play/pause button is pressed', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const playPauseBtn = el.shadowRoot.getElementById('play-pause-btn');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => { playPauseBtn.dispatchEvent(clickEvent); });

    const response = await oneEvent(el, 'play-pause-button-pressed');
    expect(response).to.exist;
  });

  it('emits an event when back button is pressed', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const backBtn = el.shadowRoot.getElementById('back-btn');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => { backBtn.dispatchEvent(clickEvent); });

    const response = await oneEvent(el, 'back-button-pressed');
    expect(response).to.exist;
  });

  it('emits an event when back button is pressed', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const forwardBtn = el.shadowRoot.getElementById('forward-btn');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => { forwardBtn.dispatchEvent(clickEvent); });

    const response = await oneEvent(el, 'forward-button-pressed');
    expect(response).to.exist;
  });
});
