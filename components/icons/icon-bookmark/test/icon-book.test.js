import { html, fixture, expect } from '@open-wc/testing';
import '../icon-bookmark.js';

const container = html`<icon-bookmark></icon-bookmark>`;

function expectToBeVisible(el) {
  expect(getComputedStyle(el).display).not.to.equal('none');
}

function expectToBeHidden(el) {
  expect(getComputedStyle(el).display).to.equal('none');
}

describe('<icon-bookmark>', () => {
  it('renders the solid icon state by default', async () => {
    const el = await fixture(container);

    expectToBeVisible(el.shadowRoot.querySelector('#filled'));
    expectToBeHidden(el.shadowRoot.querySelector('#hollow'));
    expectToBeHidden(el.shadowRoot.querySelector('#plus'));
    expectToBeHidden(el.shadowRoot.querySelector('#minus'));
  });

  it('renders hollow state', async () => {
    const el = await fixture(container);

    el.state = 'hollow';
    await el.updateComplete;

    expectToBeVisible(el.shadowRoot.querySelector('#hollow'));
    expectToBeHidden(el.shadowRoot.querySelector('#filled'));
    expectToBeHidden(el.shadowRoot.querySelector('#plus'));
    expectToBeHidden(el.shadowRoot.querySelector('#minus'));
  });

  it('renders plus state', async () => {
    const el = await fixture(container);

    el.state = 'plus';
    await el.updateComplete;

    expectToBeVisible(el.shadowRoot.querySelector('#plus'));
    expectToBeVisible(el.shadowRoot.querySelector('#hollow'));
    expectToBeHidden(el.shadowRoot.querySelector('#filled'));
    expectToBeHidden(el.shadowRoot.querySelector('#minus'));
  });

  it('renders minus state', async () => {
    const el = await fixture(container);

    el.state = 'minus';
    await el.updateComplete;

    expectToBeVisible(el.shadowRoot.querySelector('#minus'));
    expectToBeVisible(el.shadowRoot.querySelector('#hollow'));
    expectToBeHidden(el.shadowRoot.querySelector('#filled'));
    expectToBeHidden(el.shadowRoot.querySelector('#plus'));
  });
});
