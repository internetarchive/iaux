import { expect, fixture } from '@open-wc/testing';
// import Sinon from 'sinon';
import { html } from 'lit';
import type { IAPicUploader } from '../src/ia-pic-uploader';
import '../src/ia-pic-uploader';

// afterEach(() => {
//   Sinon.restore();
// });

const container = ({
  identifier = '',
  picture = '',
  endpoint = '',
  type = '',
} = {}) =>
  html` <ia-pic-uploader
    identifier="${identifier}"
    endpoint="${endpoint}"
    picture="${picture}"
    type="${type}"
  ></ia-pic-uploader>`;

describe('initail render', () => {
  it('check component params', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );

    expect(el.getAttribute('identifier')).to.be.equal('@453344354534');
    expect(el.getAttribute('endpoint')).to.be.equal(
      'http://localhost/index.php'
    );
    expect(el.getAttribute('picture')).to.be.equal(
      './demo/default-preview.jpg'
    );
    expect(el.getAttribute('type')).to.be.equal('full');
  });
});

describe('check default img render', () => {
  it('check drop-region img', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );
    await el.updateComplete;

    const img = el.shadowRoot?.querySelector(
      '.profile-section img'
    ) as HTMLImageElement;
    expect(img.src).to.contain(`default-preview.jpg`);
  });
});

describe('check default img render', () => {});
