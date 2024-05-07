import { html, fixture, expect } from '@open-wc/testing';

import type { YourWebComponent } from '../src/your-webcomponent';
import '../src/your-webcomponent';

describe('YourWebComponent', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`
    );

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent title="attribute title"></your-webcomponent>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
