import {
  html, fixture, expect, oneEvent
} from '@open-wc/testing';

import '../index';
import ZoneOfSilence from '../lib/models/zone-of-silence.js';

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
      <waveform-progress interactive=true style="width: 120px; height: 50px"></waveform-progress>
    `);

    expect(el.percentComplete).to.equal(0);

    const dragCover = el.shadowRoot.getElementById('dragcover');
    const mouseDownEvent = new MouseEvent('mousedown');
    dragCover.dispatchEvent(mouseDownEvent);

    el.percentComplete = 20;

    // we set a margin on the waveform progress (10px by default) so 20px mouse position will result in a value of 10
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 20 });

    setTimeout(() => { dragCover.dispatchEvent(mouseMoveEvent); });
    const { detail } = await oneEvent(el, 'valuechange');

    expect(detail.value).to.equal(10);
  });

  it('emits a `valuechange` event if it is interactive', async () => {
    const el = await fixture(html`
      <waveform-progress interactive=true style="width: 120px; height: 50px"></waveform-progress>
    `);
    const dragCover = el.shadowRoot.getElementById('dragcover');
    const mouseDownEvent = new MouseEvent('mousedown');
    dragCover.dispatchEvent(mouseDownEvent);

    // we set a margin on the waveform progress (10px by default) so 20px mouse position will result in a value of 10
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 20 });

    setTimeout(() => { dragCover.dispatchEvent(mouseMoveEvent); });
    const { detail } = await oneEvent(el, 'valuechange');

    expect(detail.value).to.equal(10);
  });

  it('emits a `valuechange` event as soon as the mousedown event happens', async () => {
    const el = await fixture(html`
      <waveform-progress interactive=true style="width: 120px; height: 50px"></waveform-progress>
    `);
    const dragCover = el.shadowRoot.getElementById('dragcover');

    // we set a margin on the waveform progress (10px by default) so 30px mouse position will result in a value of 20
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 30 });

    setTimeout(() => { dragCover.dispatchEvent(mouseDownEvent); });
    const { detail } = await oneEvent(el, 'valuechange');

    expect(detail.value).to.equal(20);
  });


  it('can be updated from an external source after the user has finished interacting', async () => {
    const el = await fixture(html`
      <waveform-progress interactive=true style="width: 100px; height: 50px"></waveform-progress>
    `);

    const dragCover = el.shadowRoot.getElementById('dragcover');
    const mouseDownEvent = new MouseEvent('mousedown');
    dragCover.dispatchEvent(mouseDownEvent);

    const mouseUpEvent = new MouseEvent('mouseup');
    dragCover.dispatchEvent(mouseUpEvent);

    el.percentComplete = 20;

    expect(el.percentComplete).to.equal(20);
  });

  it('does not show any zones of silence if none are passed in', async () => {
    const el = await fixture(html`
      <waveform-progress style="width: 100px; height: 50px"></waveform-progress>
    `);

    const zonesOfSilence = el.shadowRoot.querySelectorAll('.zone-of-silence');

    expect(zonesOfSilence.length).to.equal(0);
  });

  it('renders the zones of silence properly if any are passed in', async () => {
    const zone1 = new ZoneOfSilence(23, 27);
    const zone2 = new ZoneOfSilence(56, 58);
    const zonesOfSilence = JSON.stringify([zone1, zone2]);

    const el = await fixture(html`
      <waveform-progress
        style="width: 100px; height: 50px"
        zonesOfSilence=${zonesOfSilence}
        ></waveform-progress>
    `);

    const renderedZonesOfSilence = el.shadowRoot.querySelectorAll('.zone-of-silence');
    expect(renderedZonesOfSilence.length).to.equal(2);

    const firstRenderedZone = renderedZonesOfSilence[0];
    expect(firstRenderedZone.style.left).to.equal('23%');
    expect(firstRenderedZone.style.width).to.equal('4%');

    const secondRenderedZone = renderedZonesOfSilence[1];
    expect(secondRenderedZone.style.left).to.equal('56%');
    expect(secondRenderedZone.style.width).to.equal('2%');
  });
});
