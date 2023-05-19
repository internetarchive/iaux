/* eslint-disable lit/attribute-value-entities */
import { html, css, LitElement, CSSResultGroup } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import type { FilesModel } from './models';
import { BackendServiceHandler } from './services/backend-service';

import '@internetarchive/ia-activity-indicator/ia-activity-indicator';

@customElement('ia-pic-uploader')
export class IAPicUploader extends LitElement {
  @property({ type: String }) previewImg = '';

  @property({ type: String }) identifier = '';

  @property({ type: String }) endpoint = '';

  @property({ type: String }) type? = 'compact';

  @state() private showLoadingIndicator?: boolean;

  @state() showDropper: boolean = false;

  /**
   * For file Error.
   */
  @state({}) fileError = '';

  @query('#drop-region') private dropRegion?: HTMLDivElement;

  @query('#upload-region') private uploadRegion?: HTMLDivElement;

  @query('#save-file') private saveFile?: HTMLFormElement;

  @query('#self-submit-form') private selfSubmitEle?: HTMLDivElement;

  @query('#file-selector') private fileSelector?: HTMLFormElement;

  bindEvents() {
    this.dropRegion?.addEventListener('dragenter', this.preventDefault, false);
    this.dropRegion?.addEventListener('dragleave', this.preventDefault, false);
    this.dropRegion?.addEventListener('dragover', this.preventDefault, false);
    this.dropRegion?.addEventListener(
      'drop',
      this.handleDrop.bind(this),
      false
    );

    this.saveFile?.addEventListener(
      'submit',
      this.handleSaveFile.bind(this),
      false
    );

    this.fileSelector?.addEventListener('change', () => {
      const { files } = this.fileSelector!;
      this.handleFiles(files);
    });
  }

  async handleSaveFile(e: Event) {
    this.showLoadingIndicator = true;

    const form = e.target as HTMLFormElement;

    // get file name
    const fileName = (form.elements[0] as HTMLFormElement).files[0].name;

    e.preventDefault();
    e.stopPropagation();

    const response = await BackendServiceHandler({
      action: 'save-file',
      endpoint: this.endpoint,
      identifier: this.identifier,
      getParam: `submit=1&identifier=${this.identifier}&fname=${fileName}`,
    });

    setTimeout(() => {
      this.showLoadingIndicator = false;
    }, 2000);
    return response;
  }

  preventDefault(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  firstUpdated() {
    this.renderInput();
    this.bindEvents();
  }

  render() {
    return html`
      <div class="profile-section">
        <div id="drop-region" class="image-preview">
          <img alt="" src="${this.previewImg}" />
        </div>
        <div class="overlay-icon">+</div>
        ${this.type === 'full' ? this.selfSubmitForm : ''}
      </div>

      <div id="select-region">
        <div class="select-message">
          Drop a new image onto<br />your picture here or<br />
          <a href="#" id="upload-region">select an image to upload</a>
        </div>
      </div>
    `;
  }

  renderInput() {
    // open file selector when clicked on the drop region
    const fakeInput = document.createElement('input');
    fakeInput.type = 'file';
    fakeInput.accept = 'image/*';
    fakeInput.multiple = false;

    this.dropRegion?.addEventListener('click', () => {
      fakeInput.click();
    });

    this.uploadRegion?.addEventListener('click', () => {
      fakeInput.click();
    });

    fakeInput.addEventListener('change', () => {
      const { files } = fakeInput;
      this.handleFiles(files);
    });
  }

  get loadingIndicatorTemplate() {
    return html` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`;
  }

  get selfSubmitForm() {
    return html`
      <div
        id="self-submit-form"
        class="self-submit-form ${this.showDropper ? 'visible' : 'hidden'}"
      >
        <button
          class="close-button"
          @click=${() => {
            this.showDropper = false;
          }}
        >
          X
        </button>
        <div
          class="image-preview"
          @keyup=""
          @click=${() => {
            this.fileSelector?.click();
          }}
        ></div>
        <span>${this.fileError}</span>
        <form
          method="post"
          id="save-file"
          enctype="multipart/form-data"
          action="/services/post-file.php?submit=1&identifier=${this
            .identifier}"
        >
          <input
            id="file-selector"
            name="file"
            type="file"
            accept="image/*"
            style="display: none;"
          />
          <input type="hidden" name="identifier" .value="${this.identifier}" />
          <button
            id="save-button"
            type="submit"
            name="submit"
            style="display: inline-block;"
            class=${this.showLoadingIndicator ? 'pointer-none' : ''}
          >
            ${this.showLoadingIndicator
              ? this.loadingIndicatorTemplate
              : 'Save'}
          </button>
        </form>
      </div>
    `;
  }

  async submitForm() {
    const response = await BackendServiceHandler({
      action: 'email-available',
      identifier: 'this.identifier',
    });

    return response;
  }

  previewAnduploadImage(image: File) {
    this.showDropper = true;

    const img = document.createElement('img');

    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target?.result as string;
    };

    if (this.type === 'full') {
      this.selfSubmitEle!.className = 'visible';
      const preview = this.selfSubmitEle?.querySelector('.image-preview');
      preview?.appendChild(img);
    } else {
      this.dropRegion?.appendChild(img);
    }

    // read the image...
    reader.readAsDataURL(image);
  }

  validateImage(image: File) {
    // check the type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

    // check the size more than 1024|1MB
    const maxSizeInBytes = 1024 * 1024;

    this.fileError = '';

    if (validTypes.indexOf(image.type) === -1) {
      this.fileError = 'dont have valid type';
      return false;
    }
    if (image.size > maxSizeInBytes) {
      this.fileError = 'dont allowed to upload more than 1024KB';
      return false;
    }

    return true;
  }

  async handleFiles(files: FilesModel | any) {
    if (files.length) {
      // remove previews preview images
      if (this.type === 'full') {
        const imagePreview =
          this.selfSubmitEle?.querySelector('.image-preview');
        while (
          imagePreview?.firstChild &&
          imagePreview.removeChild(imagePreview.firstChild)
        );
      } else {
        while (
          this.dropRegion?.firstChild &&
          this.dropRegion.removeChild(this.dropRegion.firstChild)
        );
      }
    }

    if (this.fileSelector) this.fileSelector.files = files;

    if (files.length && this.validateImage(files[0])) {
      this.previewAnduploadImage(files[0]);
    }
  }

  handleDrop(event: any) {
    this.preventDefault(event);

    const files = event?.dataTransfer?.files;
    if (files.length) {
      this.handleFiles(files);
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      .profile-section,
      #select-region {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        position: relative;
      }

      .profile-section {
        border-radius: 100%;
      }

      .profile-section. {
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 35px rgb(0 0 0 / 5%);
        text-align: center;
        transition: 0.3s;
        position: relative;
        overflow: hidden;
        background-image: url(https://i.ebayimg.com/images/g/LpwAAOSwhcJWF1UM/s-l500.jpg);
        background-size: cover;
      }

      .image-preview {
        border-radius: 100%;
      }

      .image-preview:hover img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
        border-radius: 100%;
        opacity: 0.5;
      }

      .overlay-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 100%;
        height: 29px;
        width: 29px;
        transform: translate(-50%, -50%);
        font-size: 25px;
        background: white;
        text-align: center;
        display: none;
      }

      .profile-section:hover .overlay-icon {
        display: block;
        z-index: 1;
      }

      .overlay-icon i {
        font-size: 22px;
      }

      .image-preview img {
        height: 120px;
        width: 120px;
        border-radius: 100%;
        background-size: cover;
        background-color: rgb(255, 255, 255);
        border-radius: 50%;
        box-shadow: rgb(0 0 0 / 5%) 0px 0px 35px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        position: relative;
        overflow: hidden;
        background-image: url(https://i.ebayimg.com/images/g/LpwAAOSwhcJWF1UM/s-l500.jpg);
        background-size: cover;
      }

      #self-submit-form {
        background: #bcc3c5;
        position: absolute;
        top: 0px;
        width: 150px;
        display: grid;
        height: 250px;
        padding: 11px;
        justify-content: center;
        z-index: 2;
        border: 3px solid rgb(204, 204, 204);
        border-radius: 5px;
        justify-items: center;
      }

      #file-dropper {
        opacity: 0.9;
        filter: alpha(opacity=90);
        border-radius: 10px;
        position: absolute;
        background-color: white;
        color: black;
        z-index: 1;
        border: 3px solid #ccc;
        padding: 10px;
        text-align: center;
        left: 0;
        top: -14px;
        width: 150px;
      }

      .hidden {
        display: none !important;
      }
      .visible {
        display: block;
      }

      #file-selector {
        display: none;
      }
      .close-button {
        position: absolute;
        right: 0;
        top: 0;
      }

      button,
      input[type='submit'],
      .delete-button {
        margin-right: 5px;
        background: #000;
        border: 1px solid gray;
        color: white;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        max-height: 3.7rem;
      }

      #save-button {
        width: 80px;
      }

      ia-activity-indicator {
        display: inline-block;
        width: 20px;
        color: white;
        --activityIndicatorLoadingRingColor: #fff;
        --activityIndicatorLoadingDotColor: #fff;
      }
    `;
  }
}
