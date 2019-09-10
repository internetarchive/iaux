import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../scrubber-bar';

describe('ScrubberBar', () => {
  it('defaults to 0 percent complete', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    expect(el.percentComplete).to.equal(0);
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
    rangeSlider.dispatchEvent(mouseDownEvent)

    expect(el.userInteracting).to.equal(true);

    const mouseUpEvent = new MouseEvent('mouseup');
    rangeSlider.dispatchEvent(mouseUpEvent)

    expect(el.userInteracting).to.equal(false);
  });

  it('valuechange event is emitted when input occures on slider', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    const rangeSlider = el.shadowRoot.getElementById('slider');
    const inputEvent = new Event('input');

    // we have to do this in a setTimeout so the event listener below has a chance to listen
    setTimeout(() => { rangeSlider.dispatchEvent(inputEvent); });

    const { detail } = await oneEvent(el, 'valuechange');
    expect(detail.value).to.equal("1");

  });

});
