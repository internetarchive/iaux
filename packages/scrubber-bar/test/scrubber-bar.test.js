import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../scrubber-bar';

describe('ScrubberBar', () => {
  it('defaults value to 0', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    expect(el.value).to.equal(0);
  });

  it('userInteracting flag gets set to true when mousedown on slider', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    expect(el.userInteracting).to.equal(false);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const mouseDownEvent = new MouseEvent('mousedown');
    rangeSlider.dispatchEvent(mouseDownEvent)

    expect(el.userInteracting).to.equal(true);
  });

  it('userInteracting flag gets set to false when mouseup on slider', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    expect(el.userInteracting).to.equal(false);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const mouseDownEvent = new MouseEvent('mousedown');
    rangeSlider.dispatchEvent(mouseDownEvent);

    expect(el.userInteracting).to.equal(true);

    const mouseUpEvent = new MouseEvent('mouseup');
    rangeSlider.dispatchEvent(mouseUpEvent);

    expect(el.userInteracting).to.equal(false);
  });

  it('valuechange event is emitted when input occurs on slider', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const inputEvent = new Event('input');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.equal(0);

  });

  it('the proper value is returned after an input change event', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    rangeSlider.value = 20;
    const inputEvent = new Event('input');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.equal(20);

  });

  it('the proper percentage is calculated', async () => {
    const el = await fixture(html`
      <scrubber-bar min="10" max="50"></scrubber-bar>
    `);

    const inputEvent = new Event('input');
    const rangeSlider = el.shadowRoot.getElementById('slider');

    rangeSlider.value = 10;
    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

    var response = await oneEvent(el, 'valuechange');
    expect(response.detail.value).to.equal(10);
    expect(el.percentage).to.equal(0);

    rangeSlider.value = 20;
    setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

    response = await oneEvent(el, 'valuechange');
    expect(response.detail.value).to.equal(20);
    expect(el.percentage).to.equal(25);
  });
});
