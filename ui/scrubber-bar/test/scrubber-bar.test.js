import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../index';
import promisedSleep from './promised-sleep';

/* eslint-disable no-unused-expressions */

describe('ScrubberBar', () => {
  it('defaults value to 0', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    expect(el.value).to.equal(0);
  });

  it('dispatches userInteractionStarted event on user mousedown', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const event = new MouseEvent('mousedown');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(event);
    });
    const response = await oneEvent(el, 'userInteractionStarted');
    expect(response).to.exist;
  });

  it('dispatches userInteractionEnded event on user mouseup', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const event = new MouseEvent('mouseup');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(event);
    });
    const response = await oneEvent(el, 'userInteractionEnded');
    expect(response).to.exist;
  });

  it('dispatches userInteractionStarted event on user touchstart', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const event = new Event('touchstart');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(event);
    });
    const response = await oneEvent(el, 'userInteractionStarted');
    expect(response).to.exist;
  });

  it('dispatches userInteractionEnded event on user touchend', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const event = new Event('touchend');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(event);
    });
    const response = await oneEvent(el, 'userInteractionEnded');
    expect(response).to.exist;
  });

  it('dispatches valuechange event when input occurs on slider', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const inputEvent = new Event('input');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(inputEvent);
    });

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.equal(0);
  });

  it('dispatches the proper value after an input change event', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    rangeSlider.value = 20;
    const inputEvent = new Event('input');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(inputEvent);
    });

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.equal(20);
  });

  it('calculates the proper percentage for the given value and range', async () => {
    const el = await fixture(html`
      <scrubber-bar min="10" max="50"></scrubber-bar>
    `);

    const inputEvent = new Event('input');
    const rangeSlider = el.shadowRoot.getElementById('slider');

    rangeSlider.value = 10;
    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => {
      rangeSlider.dispatchEvent(inputEvent);
    });

    let response = await oneEvent(el, 'valuechange');
    expect(response.detail.value).to.equal(10);
    expect(el.percentage).to.equal(0);

    rangeSlider.value = 20;
    setTimeout(() => {
      rangeSlider.dispatchEvent(inputEvent);
    });

    response = await oneEvent(el, 'valuechange');
    expect(response.detail.value).to.equal(20);
    expect(el.percentage).to.equal(25);
  });

  it('does not update the slider field value if the user is interacting', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    expect(el.value).to.equal(0);

    const event = new MouseEvent('mousedown');
    const rangeSlider = el.shadowRoot.getElementById('slider');

    setTimeout(() => {
      rangeSlider.dispatchEvent(event);
    });
    await oneEvent(el, 'userInteractionStarted');

    el.value = 20;

    expect(rangeSlider.value).to.equal('0');
  });

  it('properly lays out section markers', async() => {
    const el = await fixture(html`
      <scrubber-bar
        sectionMarkerPercentages='[10, 11, 25, 30, 50, 75]'>
      </scrubber-bar>
    `);

    const sectionMarkers = el.shadowRoot.querySelectorAll('section-marker');
    expect(sectionMarkers.length).to.equal(6);

    const testMarker = sectionMarkers[1];
    expect(testMarker.style.left).to.equal('11%');
  });

  it('sets the marker flag values properly', async() => {
    const el = await fixture(html`
      <scrubber-bar
        sectionMarkerPercentages='[10, 11, 25, 30, 50, 75]'
        value='37'
        expandSectionMarkers='true'>
      </scrubber-bar>
    `);

    const sectionMarkers = el.shadowRoot.querySelectorAll('section-marker');
    const prevMarker = sectionMarkers[2];
    const leftMarker = sectionMarkers[3];
    const rightMarker = sectionMarkers[4];
    const nextMarker = sectionMarkers[5];
    expect(prevMarker.markerMode).to.equal('neither');
    expect(leftMarker.markerMode).to.equal('right');
    expect(rightMarker.markerMode).to.equal('left');
    expect(nextMarker.markerMode).to.equal('neither');
  });

  it('sets does not set the section markers if `expandSectionMarkers` is `false`', async() => {
    const el = await fixture(html`
      <scrubber-bar
        sectionMarkerPercentages='[10, 11, 25, 30, 50, 75]'
        value='37'>
      </scrubber-bar>
    `);

    const sectionMarkers = el.shadowRoot.querySelectorAll('section-marker');
    const prevMarker = sectionMarkers[2];
    const leftMarker = sectionMarkers[3];
    const rightMarker = sectionMarkers[4];
    const nextMarker = sectionMarkers[5];
    expect(prevMarker.markerMode).to.equal('neither');
    expect(leftMarker.markerMode).to.equal('neither');
    expect(rightMarker.markerMode).to.equal('neither');
    expect(nextMarker.markerMode).to.equal('neither');
  });
});
