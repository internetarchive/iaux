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

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 10 });

    setTimeout(() => { dragCover.dispatchEvent(mouseMoveEvent); });
    const { detail } = await oneEvent(el, 'valuechange');

    expect(detail.value).to.equal(10);
  });

  it('emits a `valuechange` event if it is interactive', async () => {
    const el = await fixture(html`
      <waveform-progress interactive=true style="width: 100px; height: 50px"></waveform-progress>
    `);
    const dragCover = el.shadowRoot.getElementById('dragcover');
    const mouseDownEvent = new MouseEvent('mousedown');
    dragCover.dispatchEvent(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 10 });

    setTimeout(() => { dragCover.dispatchEvent(mouseMoveEvent); });
    const { detail } = await oneEvent(el, 'valuechange');

    expect(detail.value).to.equal(10);
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
});
