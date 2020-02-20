import { html, fixture, expect } from '@open-wc/testing';

import '../src/media-slider';
import menus from'../src/data/menus';

const component = (mediaSliderOpen, mediaSliderAnimate, selectedMenuOption) => (
  html`<media-slider
          ?mediaSliderOpen="${mediaSliderOpen}"
          ?mediaSliderAnimate="${mediaSliderAnimate}"
          selectedMenuOption="${selectedMenuOption}"></media-slider>`
);

describe('<media-slider>', () => {
  it('sets default properties', async () => {
    const mediaSlider = await fixture(component(false, false, ''));

    expect(mediaSlider.mediaSliderOpen).to.be.false;
    expect(mediaSlider.mediaSliderAnimate).to.be.false;
    expect(mediaSlider.selectedMenuOption).to.equal('');
  });

  it('renders a media subnav when media type selected', async () => {
    const mediaSlider = await fixture(component(false, false, 'texts'));
    const menuHeading = mediaSlider.shadowRoot.querySelector('media-subnav').shadowRoot.querySelector('h3');

    expect(menuHeading.innerText).to.equal(menus.texts.heading);
  });

  it('renders the Wayback component when web menu selected', async () => {
    const mediaSlider = await fixture(component(false, false, 'web'));
    const waybackSearch = mediaSlider.shadowRoot.querySelector('media-subnav').shadowRoot.querySelector('wayback-search');

    expect(waybackSearch).to.not.be.undefined;
  });

  it('renders the more links component when more menu selected', async () => {
    const mediaSlider = await fixture(component(false, false, 'more'));
    const moreSlider = mediaSlider.shadowRoot.querySelector('media-subnav').shadowRoot.querySelector('more-slider');

    expect(moreSlider).to.not.be.undefined;
  });
});
