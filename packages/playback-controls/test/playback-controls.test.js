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

  it('emits an event when playback rate button is pressed', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const forwardBtn = el.shadowRoot.getElementById('playback-rate-btn');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => { forwardBtn.dispatchEvent(clickEvent); });

    const response = await oneEvent(el, 'playbackRateChange');
    expect(response).to.exist;
  });

  it('emits an event when volume control button is pressed', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const forwardBtn = el.shadowRoot.getElementById('volume-control-btn');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => { forwardBtn.dispatchEvent(clickEvent); });

    const response = await oneEvent(el, 'volumeChange');
    expect(response).to.exist;
  });

  it('emits an event when previous section button is pressed', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const forwardBtn = el.shadowRoot.getElementById('prev-section-btn');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => { forwardBtn.dispatchEvent(clickEvent); });

    const response = await oneEvent(el, 'prev-section-button-pressed');
    expect(response).to.exist;
  });

  it('emits an event when next section button is pressed', async () => {
    const el = await fixture(html`
      <playback-controls></playback-controls>
    `);

    const forwardBtn = el.shadowRoot.getElementById('next-section-btn');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => { forwardBtn.dispatchEvent(clickEvent); });

    const response = await oneEvent(el, 'next-section-button-pressed');
    expect(response).to.exist;
  });

  it('changes playback rate to 0.5 after it has reached 2.0', async () => {
    const el = await fixture(html`
      <playback-controls
        playbackRate='2.0'>
      </playback-controls>
    `);

    const forwardBtn = el.shadowRoot.getElementById('playback-rate-btn');
    const clickEvent = new MouseEvent('click');
    forwardBtn.dispatchEvent(clickEvent);
    expect(el.playbackRate).to.equal(0.5);
  });

  it('changes volume by 0.25 when less than 1.0', async () => {
    const el = await fixture(html`
      <playback-controls
        volume='0.5'>
      </playback-controls>
    `);

    const volumeControlBtn = el.shadowRoot.getElementById('volume-control-btn');
    const clickEvent = new MouseEvent('click');
    volumeControlBtn.dispatchEvent(clickEvent);
    expect(el.volume).to.equal(0.75);
  });

  it('changes volume to 0.000001 after 1.0', async () => {
    const el = await fixture(html`
      <playback-controls
        volume='1.0'>
      </playback-controls>
    `);

    const volumeControlBtn = el.shadowRoot.getElementById('volume-control-btn');
    const clickEvent = new MouseEvent('click');
    volumeControlBtn.dispatchEvent(clickEvent);
    expect(el.volume).to.equal(0.000001);
  });

  it('rounds the volume display', async () => {
    const el = await fixture(html`
      <playback-controls
        volume='0.2346'>
      </playback-controls>
    `);

    expect(el.volumeDisplay).to.equal(23);
  });
});
