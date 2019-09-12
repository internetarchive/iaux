import {
  html, fixture, expect, oneEvent
} from '@open-wc/testing';

import '../waveform-progress';

describe('Waveform Progress', () => {
  it('defaults percentage to 0', async () => {
    const el = await fixture(html`
      <waveform-progress></waveform-progress>
    `);

    expect(el.percentComplete).to.equal(0);
  });

  it('does not have the draggable cover if `interactive` parameter not provided (the default)', async () => {
    const el = await fixture(html`
      <waveform-progress></waveform-progress>
    `);
    const dragCover = el.shadowRoot.getElementById('dragcover');
    expect(dragCover).to.not.exist;
  });

  it('has the draggable cover if `interactive` is true', async () => {
    const el = await fixture(html`
      <waveform-progress interactive=true></waveform-progress>
    `);
    const dragCover = el.shadowRoot.getElementById('dragcover');
    expect(dragCover).to.exist;
  });

  it('does not update from external source if user is interacting', async () => {
    const el = await fixture(html`
      <waveform-progress interactive=true style="width: 100px; height: 50px"></waveform-progress>
    `);

    expect(el.percentComplete).to.equal(0);

    const dragCover = el.shadowRoot.getElementById('dragcover');
    const mouseDownEvent = new MouseEvent('mousedown');
    dragCover.dispatchEvent(mouseDownEvent);

    el.percentComplete = 20;

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 10 })

    setTimeout(() => { dragCover.dispatchEvent(mouseMoveEvent); });
    const { detail } = await oneEvent(el, 'valuechange');

    expect(detail.value).to.equal(10);
  });


  // it('dispatches userInteractionStarted event on user mousedown', async () => {
  //   const el = await fixture(html`
  //     <waveform-progress></waveform-progress>
  //   `);

  //   const rangeSlider = el.shadowRoot.getElementById('slider');
  //   const event = new MouseEvent('mousedown');

  //   // we have to do this in a setTimeout so the event listener below has a chance to listen
  //   setTimeout(() => { rangeSlider.dispatchEvent(event); });
  //   const response = await oneEvent(el, 'userInteractionStarted');
  //   expect(response).to.exist;
  // });

  // it('dispatches userInteractionEnded event on user mouseup', async () => {
  //   const el = await fixture(html`
  //     <waveform-progress></waveform-progress>
  //   `);

  //   const rangeSlider = el.shadowRoot.getElementById('slider');
  //   const event = new MouseEvent('mouseup');

  //   // we have to do this in a setTimeout so the event listener below has a chance to listen
  //   setTimeout(() => { rangeSlider.dispatchEvent(event); });
  //   const response = await oneEvent(el, 'userInteractionEnded');
  //   expect(response).to.exist;
  // });

  // it('dispatches userInteractionStarted event on user touchstart', async () => {
  //   const el = await fixture(html`
  //     <waveform-progress></waveform-progress>
  //   `);

  //   const rangeSlider = el.shadowRoot.getElementById('slider');
  //   const event = new Event('touchstart');

  //   // we have to do this in a setTimeout so the event listener below has a chance to listen
  //   setTimeout(() => { rangeSlider.dispatchEvent(event); });
  //   const response = await oneEvent(el, 'userInteractionStarted');
  //   expect(response).to.exist;
  // });

  // it('dispatches userInteractionEnded event on user touchend', async () => {
  //   const el = await fixture(html`
  //     <waveform-progress></waveform-progress>
  //   `);

  //   const rangeSlider = el.shadowRoot.getElementById('slider');
  //   const event = new Event('touchend');

  //   // we have to do this in a setTimeout so the event listener below has a chance to listen
  //   setTimeout(() => { rangeSlider.dispatchEvent(event); });
  //   const response = await oneEvent(el, 'userInteractionEnded');
  //   expect(response).to.exist;
  // });

  // it('dispatches valuechange event when input occurs on slider', async () => {
  //   const el = await fixture(html`
  //     <waveform-progress></waveform-progress>
  //   `);

  //   const rangeSlider = el.shadowRoot.getElementById('slider');
  //   const inputEvent = new Event('input');

  //   // we have to do this in a setTimeout so the event listener below has a chance to listen
  //   setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

  //   const { detail } = await oneEvent(el, 'valuechange');
  //   expect(detail.value).to.equal(0);
  // });

  // it('dispatches the proper value after an input change event', async () => {
  //   const el = await fixture(html`
  //     <waveform-progress></waveform-progress>
  //   `);

  //   const rangeSlider = el.shadowRoot.getElementById('slider');
  //   rangeSlider.value = 20;
  //   const inputEvent = new Event('input');

  //   // we have to do this in a setTimeout so the event listener below has a chance to listen
  //   setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

  //   const { detail } = await oneEvent(el, 'valuechange');
  //   expect(detail.value).to.equal(20);
  // });

  // it('calculates the proper percentage for the given value and range', async () => {
  //   const el = await fixture(html`
  //     <waveform-progress min="10" max="50"></waveform-progress>
  //   `);

  //   const inputEvent = new Event('input');
  //   const rangeSlider = el.shadowRoot.getElementById('slider');

  //   rangeSlider.value = 10;
  //   // we have to do this in a setTimeout so the event listener below has a chance to listen
  //   setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

  //   let response = await oneEvent(el, 'valuechange');
  //   expect(response.detail.value).to.equal(10);
  //   expect(el.percentage).to.equal(0);

  //   rangeSlider.value = 20;
  //   setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

  //   response = await oneEvent(el, 'valuechange');
  //   expect(response.detail.value).to.equal(20);
  //   expect(el.percentage).to.equal(25);
  // });

  // it('does not update the slider field value if the user is interacting', async () => {
  //   const el = await fixture(html`
  //     <waveform-progress></waveform-progress>
  //   `);

  //   expect(el.value).to.equal(0);

  //   const event = new MouseEvent('mousedown');
  //   const rangeSlider = el.shadowRoot.getElementById('slider');

  //   setTimeout(() => { rangeSlider.dispatchEvent(event); });
  //   await oneEvent(el, 'userInteractionStarted');

  //   el.value = 20;

  //   expect(rangeSlider.value).to.equal('0');
  // });
});
