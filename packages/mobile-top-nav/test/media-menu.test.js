import { html, fixture, expect } from '@open-wc/testing';

import '../src/media-menu';

const verifyClosed = (instance) => {
  expect(instance.mediaSliderAnimate).to.be.true;
  expect(instance.mediaSliderOpen).to.be.false;
  expect(instance.selectedMenuOption).to.equal('');
};

const verifyOpened = (instance, mediatype) => {
  expect(instance.mediaSliderOpen).to.be.true;
  expect(instance.mediaSliderAnimate).to.be.true;
  expect(instance.selectedMenuOption).to.equal(mediatype);
};

describe('<media-menu>', () => {
  it('sets default properties', async () => {
    const mediaMenu = await fixture(html`<media-menu></media-menu>`);

    expect(mediaMenu.mediaSliderOpen).to.be.false;
    expect(mediaMenu.mediaSliderAnimate).to.be.false;
    expect(mediaMenu.selectedMenuOption).to.equal('');
  });

  it('sets media slider to closed', async () => {
    const mediaMenu = await fixture(html`<media-menu></media-menu>`);

    mediaMenu.mediaSliderOpen = true;
    mediaMenu.selectedMenuOption = 'foo';
    mediaMenu.closeMediaSlider();

    verifyClosed(mediaMenu);
  });

  it('toggles media slider visibility and starts animation', async () => {
    const mediaMenu = await fixture(html`<media-menu></media-menu>`);
    const mediatype = 'foo';

    mediaMenu.selectedMenuOption = mediatype;
    mediaMenu.toggleMediaSlider();

    verifyOpened(mediaMenu, mediatype);
  });

  it('closes media slider if selected menu type is the open menu type', async () => {
    const mediaMenu = await fixture(html`<media-menu></media-menu>`);
    const mediatype = 'foo';

    mediaMenu.selectedMenuOption = mediatype;
    mediaMenu.select(mediatype);

    verifyClosed(mediaMenu);
  });

  it('opens media slider menu and starts animation', async () => {
    const mediaMenu = await fixture(html`<media-menu></media-menu>`);
    const mediatype = 'foo';

    mediaMenu.select(mediatype);

    verifyOpened(mediaMenu, mediatype);
  });
});
