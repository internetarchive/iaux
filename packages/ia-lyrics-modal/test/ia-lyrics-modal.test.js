import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../src/lyrics-modal';

const component = html`<lyrics-modal>`;

describe('<lyrics-modal>', () => {
  it('sets default properties', async () => {
    const el = await fixture(component);

    expect(el.lyrics).to.equal(el.loadingMessage);
    expect(el.visible).to.be.false;
  });

  it('toggles modal visibility when method called', async () => {
    const el = await fixture(component);
    const visibleClass = 'visible';
    const modal = el.shadowRoot.children[0];

    el.show();
    await el.updateComplete;

    expect(modal.classList.contains(visibleClass)).to.be.true;

    el.hide();
    await el.updateComplete;

    expect(modal.classList.contains(visibleClass)).to.be.false;
  });

  it('updates properties necessary to load and render lyrics', async () => {
    const el = await fixture(component);
    const lyrics = 'We\'re gonna need to have a chorus';
    const songInfo = {
      artist: 'King Crimson',
      song: 'I Talk to the Wind',
    };

    sinon.stub(el, 'fetchLyrics').callsFake(() => {
      el.lyrics = lyrics;
    });
    el.load(songInfo);

    await el.updateComplete;

    expect(el.song).to.equal(songInfo.song);
    expect(el.artist).to.equal(songInfo.artist);
    expect(el.visible).to.be.true;
    expect(el.fetchLyrics.callCount).to.equal(1);
    expect(el.lyrics).to.equal(lyrics);
  });

  it('reloads with existing artist and song when no options passed', async () => {
    const el = await fixture(component);
    const lyrics = 'We\'re gonna need to have a chorus';
    const songInfo = {
      artist: 'King Crimson',
      song: 'I Talk to the Wind',
    };

    sinon.stub(el, 'fetchLyrics').callsFake(() => {
      el.lyrics = lyrics;
    });
    el.artist = songInfo.artist;
    el.song = songInfo.song;
    el.load();

    await el.updateComplete;

    expect(el.visible).to.be.true;
    expect(el.fetchLyrics.callCount).to.equal(1);
    expect(el.lyrics).to.equal(lyrics);
  });
});
