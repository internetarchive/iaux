import { html, fixture, expect } from '@open-wc/testing';

import type { IAUserList } from '../src/ia-user-list';
import '../src/ia-user-list';

describe('IAUserList', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<IAUserList>(
      html`<ia-user-list></ia-user-list>`
    );

    expect(el.title).to.equal('Hey there');
    // expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<IAUserList>(
      html`<ia-user-list></ia-user-list>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    // expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<IAUserList>(
      html`<ia-user-list title="attribute title"></ia-user-list>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<IAUserList>(
      html`<ia-user-list></ia-user-list>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
