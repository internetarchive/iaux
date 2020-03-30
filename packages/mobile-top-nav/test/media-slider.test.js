import { html, fixture, expect, oneEvent } from '@open-wc/testing';

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

  it('changes link lists when selected menu option changed', async () => {
    const mediaSlider = await fixture(component(false, false, ''));
    const option = 'texts';

    mediaSlider.selectedMenuOption = option;

    expect(mediaSlider.links.heading).to.equal(menus[option].heading);
  });
});
