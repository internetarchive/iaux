import { fixture, expect, html } from '@open-wc/testing';

import '../index';

describe('Icon', () => {
  const fillColor = '#ccc';
  const strokeColor = '#000';

  it('renders an icon', async () => {
    const el = await fixture(html`<icon-web></icon-web>`);

    expect(el.shadowRoot.querySelector('svg')).to.exist;
  });

  [
    html`<icon-advance fill=${fillColor}></icon-advance>`,
    html`<icon-audio fill=${fillColor}></icon-audio>`,
    html`<icon-close fill=${fillColor}></icon-close>`,
    html`<icon-donate fill=${fillColor}></icon-donate>`,
    html`<icon-ellipses fill=${fillColor}></icon-ellipses>`,
    html`<icon-iaLogo fill=${fillColor}></icon-iaLogo>`,
    html`<icon-images fill=${fillColor}></icon-images>`,
    html`<icon-search fill=${fillColor}></icon-search>`,
    html`<icon-software fill=${fillColor}></icon-software>`,
    html`<icon-texts fill=${fillColor}></icon-texts>`,
    html`<icon-upload fill=${fillColor}></icon-upload>`,
    html`<icon-user fill=${fillColor}></icon-user>`,
    html`<icon-video fill=${fillColor}></icon-video>`,
    html`<icon-web fill=${fillColor}></icon-web>`,
  ].map(async (template) => {
    it(`sets a fill attribute on ${template}`, async () => {
      const el = await fixture(template);

      el.shadowRoot.querySelectorAll('.fill-color').forEach((node) => {
        expect(node.getAttribute('fill')).to.equal(fillColor);
      });
    });
  });

  [
    html`<icon-advance stroke=${strokeColor}></icon-advance>`,
  ].map(async (template) => {
    it(`sets a stroke color attribute on ${template}`, async () => {
      const el = await fixture(template);

      el.shadowRoot.querySelectorAll('.stroke-color').forEach((node) => {
        expect(node.getAttribute('stroke')).to.equal(strokeColor);
      });
    });
  });
});
