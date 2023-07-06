import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { IAPicUploader } from '../src/ia-pic-uploader';
import '../src/ia-pic-uploader';

const container = ({
  identifier = '@453344354534',
  endpoint = 'http://localhost/index.php',
  picture = './demo/default-preview.jpg',
  type = 'full',
  lookingAtMyAccount = false,
  maxFileSizeInMB = 0,
} = {}) =>
  html` <ia-pic-uploader
    identifier="${identifier}"
    endpoint="${endpoint}"
    picture="${picture}"
    type="${type}"
    lookingAtMyAccount="${lookingAtMyAccount}"
    maxFileSizeInMB="${maxFileSizeInMB}"
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

    expect(el.getAttribute('identifier')).to.equal('@453344354534');
    expect(el.getAttribute('endpoint')).to.equal('http://localhost/index.php');
    expect(el.getAttribute('picture')).to.equal('./demo/default-preview.jpg');
    expect(el.getAttribute('type')).to.equal('full');
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
      '.profile-section .image-preview img'
    ) as HTMLImageElement;
    expect(img.src).to.contain(`default-preview.jpg`);
  });
});

describe('check initial self submit form is located', () => {
  it('check self submit and child element', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );
    await el.updateComplete;

    const selfSubmitEle = el.shadowRoot?.querySelector(
      '.profile-section .self-submit-form'
    );

    expect(selfSubmitEle).to.exist;
    expect(selfSubmitEle?.classList.contains('hidden'));
    expect(selfSubmitEle?.querySelector('.plus-icon')).to.exist;
    expect(selfSubmitEle?.querySelector('.drag-text')).to.exist;
    expect(selfSubmitEle?.querySelector('#save-file')).to.exist;
    expect(selfSubmitEle?.querySelector('#file-picker')).to.exist;
    expect(
      selfSubmitEle
        ?.querySelector('.close-button')
        ?.classList.contains('hidden')
    ).to.exist;
  });
});

describe('check initial component with compact verion', () => {
  it('check initial render', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'compact',
      })
    );
    const selectRegion = el.shadowRoot?.querySelector('.select-region');

    expect(selectRegion).to.exist;
  });
});

describe('check file validation function', () => {
  it('function must return type error & false', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );
    const fileData = new File(['!helow sdf'], 'image.svg', {
      type: 'image/svg',
      lastModified: new Date().getTime(),
    });

    el.validateImage(fileData);
    await el.updateComplete;
    expect(el.fileValidationError).to.equal(
      'Image file must be a JPEG, PNG, or GIF.'
    );
    expect(el.validateImage(fileData)).to.false;
  });

  it('function must return type size Error & false', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
        lookingAtMyAccount: true,
        maxFileSizeInMB: 3,
      })
    );
    await el.updateComplete;

    const fileData = new File([new ArrayBuffer(5042881)], 'image.jpeg', {
      type: 'image/jpeg',
      lastModified: new Date().getTime(),
    });
    el.validateImage(fileData);

    expect(el.fileValidationError).to.equal(
      `Image file must be less than ${el.maxFileSizeInMB}MB.`
    );
    expect(el.validateImage(fileData)).to.false;
  });
});

describe('test previewImage function', () => {
  it('check funtionality one by one for full variant', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );
    const fullPreview = el.shadowRoot?.querySelector('.full-preview');
    const fileData = {
      0: new File([new ArrayBuffer(5242881)], 'image123.jpeg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    };

    expect(fullPreview?.firstChild).to.be.empty;

    el.previewImage(fileData[0]);
    await el.updateComplete;
    expect(fullPreview?.firstChild).to.exist;
    expect(el.showDropper).to.true;
  });

  it('check funtionality one by one for full variant', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'compact',
      })
    );
    const fileData = {
      0: new File([new ArrayBuffer(5242881)], 'image123.jpeg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    };

    el.previewImage(fileData[0]);
    await el.updateComplete;
    expect(el.showDropper).to.true;
  });
});

describe('test handleDropImage Function', () => {
  it('check drop event for full variant', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
        lookingAtMyAccount: true,
      })
    );
    const selfSubmitEle = el.shadowRoot?.querySelector(
      '.profile-section .self-submit-form'
    );

    window.dispatchEvent(new DragEvent('dragover'));
    await el.updateComplete;
    selfSubmitEle?.dispatchEvent(new DragEvent('drop'));
    await el.updateComplete;
    expect(selfSubmitEle?.classList.contains('drag-over')).to.false;

    el.cancelFile();
    el.updateComplete;

    expect(el.showDropper).to.be.false;
    expect(el.fileValidationError).to.be.equal('');
    expect(selfSubmitEle?.classList.contains('hidden')).to.be.true;
    expect(selfSubmitEle?.classList.contains('profile-hover')).to.be.false;
  });
});

describe('test loadingIndicatorTemplate function', () => {
  it('check function return ', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );
    const loaderReturn = el.loadingIndicatorTemplate;
    await el.updateComplete;

    expect(loaderReturn.strings[0]).to.be.contain(`<ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`);
  });
});

describe('test handleSelectedFiles function', () => {
  it('check funtionality one by one', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );
    const selfSubmitEle = el.shadowRoot?.querySelector(
      '.profile-section .self-submit-form'
    );

    await el.updateComplete;
    const dataTransfer = new DataTransfer();
    const file = new File(['content'], 'image.jpeg');
    dataTransfer.items.add(file);
    const fileList = dataTransfer.files;
    el.handleSelectedFiles(fileList);

    await el.updateComplete;
    expect(selfSubmitEle?.classList.contains('hidden')).to.be.false;
  });
});
