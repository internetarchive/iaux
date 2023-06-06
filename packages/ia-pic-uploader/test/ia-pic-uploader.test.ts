import { expect, fixture } from '@open-wc/testing';
// import Sinon from 'sinon';
import { html } from 'lit';
import type { IAPicUploader } from '../src/ia-pic-uploader';
import '../src/ia-pic-uploader';

// afterEach(() => {
//   Sinon.restore();
// });

const container = ({
  identifier = '@453344354534',
  endpoint = 'http://localhost/index.php',
  picture = './demo/default-preview.jpg',
  type = 'full',
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
    expect(selfSubmitEle?.querySelector('.plusIcon')).to.exist;
    expect(selfSubmitEle?.querySelector('.drag-text')).to.exist;
    expect(selfSubmitEle?.querySelector('#save-file')).to.exist;
    expect(selfSubmitEle?.querySelector('#file-picker')).to.exist;
    expect(selfSubmitEle?.querySelector('.validationErrorDiv')).to.exist;
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
  it('check is function must return - true', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );
    const fileData = new File(['asdfasd'], 'image.jpg', {
      type: 'image/jpeg',
      lastModified: new Date().getTime(),
    });
    await el.updateComplete;
    expect(el.validateImage(fileData)).to.true;
  });

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
      'file must be  format of JPEG or PNG or GIF.'
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
      })
    );
    const fileData = new File([new ArrayBuffer(5242881)], 'image.jpeg', {
      type: 'image/jpeg',
      lastModified: new Date().getTime(),
    });

    el.validateImage(fileData);
    await el.updateComplete;
    expect(el.fileValidationError).to.equal('file size must be less than 5MB.');
    expect(el.validateImage(fileData)).to.false;
  });
});

describe('test previewImage function', () => {
  it('check funtionality one by one', async () => {
    const el = await fixture<IAPicUploader>(
      container({
        identifier: '@453344354534',
        endpoint: 'http://localhost/index.php',
        picture: './demo/default-preview.jpg',
        type: 'full',
      })
    );
    const fileData = {
      0: new File([new ArrayBuffer(5242881)], 'image.jpeg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    };
    el.previewImage(fileData[0]);
    await el.updateComplete;
    expect(el.showDropper).to.true;
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
    // const selfSubmitEle = el.shadowRoot?.querySelector(
    //   '.profile-section .self-submit-form'
    // );
    const fileData = {
      0: new File(['asdfafs'], 'image1.jpeg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    };
    el.handleSelectedFiles(fileData);
    el.previewImage(fileData[0]);

    await el.updateComplete;
    // expect(selfSubmitEle?.classList.contains('hidden')).to.false;

    // const img = selfSubmitEle?.querySelector(
    //   '.full-preview img'
    // ) as HTMLImageElement;
    // console.log(img);
    // expect(img.src).to.contain('image1');
  });
});

// describe('check file select event', () => {
//   it('check file selector', async () => {
//     const el = await fixture<IAPicUploader>(
//       container({
//         identifier: '@453344354534',
//         endpoint: 'http://localhost/index.php',
//         picture: './demo/default-preview.jpg',
//         type: 'full',
//       })
//     );

//     const selfSubmitForm = el.shadowRoot?.querySelector('.self-submit-form');
//     const fileSelector = selfSubmitForm?.querySelector(
//       '.file-selector'
//     ) as HTMLFormElement;
//     const fileList = new File(['hello image'], 'test-file.png', {
//       type: 'image/png',
//     });
//     await el.updateComplete;

//     const dataTransfer = new DataTransfer();

//     dataTransfer.items.add(fileList);
//     fileSelector.files = dataTransfer.files;
//     fileSelector?.dispatchEvent(new InputEvent('change'));

//     await el.updateComplete;

//     console.log(dataTransfer.files);
//     console.log(fileSelector.files);
//   });
// });
