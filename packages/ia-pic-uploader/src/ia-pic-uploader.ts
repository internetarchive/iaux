/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable lit/attribute-value-entities */
import { html, css, LitElement, CSSResultGroup } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import type { FilesModel } from './models';
import { BackendServiceHandler } from './services/backend-service';

import '@internetarchive/ia-activity-indicator/ia-activity-indicator';

@customElement('ia-pic-uploader')
export class IAPicUploader extends LitElement {
  @property({ type: String }) identifier = '';

  @property({ type: String }) endpoint = '/services/post-file.php';

  @property({ type: String }) previewImg = '';

  @property({ type: String }) type? = 'compact';

  @state() private showLoadingIndicator?: boolean;

  @state() showDropper: boolean = false;

  @state() fileError: string = '';

  @query('#drop-region') private dropRegion?: HTMLDivElement;

  @query('#upload-region') private uploadRegion?: HTMLDivElement;

  @query('#save-file') private saveFile?: HTMLFormElement;

  @query('#self-submit-form') private selfSubmitEle?: HTMLDivElement;

  @query('#file-selector') private fileSelector?: HTMLFormElement;

  firstUpdated() {
    this.renderInput();
    this.bindEvents();
  }

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

  preventDefault(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  async handleSaveFile(event: Event) {
    await this.preventDefault(event);
    this.showLoadingIndicator = true;

    console.log('handleSaveFile()');
    // get input file
    const inputFile = this.fileSelector?.files[0];

    const response = await BackendServiceHandler({
      action: 'save-file',
      identifier: this.identifier,
      file: inputFile,
      getParam: `submit=1&identifier=${
        this.identifier
      }&fname=${encodeURIComponent(inputFile.name)}`,
      endpoint: this.endpoint,
      headers: { 'Content-type': 'multipart/form-data; charset=UTF-8' },
      callback: () => {
        this.metadataAPIExecution();
      },
    });
    return response;
  }

  metadataAPIExecution() {
    console.log('metadataAPIExecution()');

    const now = Math.round(Date.now() / 1000); // like unix time()
    const metadataApiInterval = setInterval(async () => {
      const res = BackendServiceHandler({
        action: 'verify-upload',
        endpoint: `/metadata/${this.identifier}?rand=${Math.random()}`,
      });
      console.log(res);
      res.then((json: any) => {
        console.log(json);

        const waitCount =
          json.pending_tasks && json.tasks ? json.tasks.length : 0;
        if (!waitCount) {
          if (json.item_last_updated < now) {
            this.fileError = 'waiting for your tasks to queue';
          } else {
            console.log('task(s) done!');
            clearInterval(metadataApiInterval);
            this.fileError = 'reloading page with your image';
            window.location.reload();
          }
        } else {
          const errored = json.tasks.filter(
            (e: any) => e.wait_admin === 2
          ).length;
          if (errored) {
            this.fileError =
              'status task failure -- an admin will need to resolve';
            clearInterval(metadataApiInterval);
          } else {
            this.fileError = `waiting for your ${waitCount} tasks to finish`;
          }
        }
      });
    }, 2000);
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
    if (files.length && this.validateImage(files[0])) {
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
        <span class="file-error">${this.fileError}</span>
        <form
          method="post"
          id="save-file"
          enctype="multipart/form-data"
          action="${this.endpoint}?submit=1&identifier=${this.identifier}"
        >
          <input
            id="file-selector"
            name="file"
            type="file"
            accept="image/*"
            style="display: none;"
          />
          <input type="hidden" name="identifier" .value="${this.identifier}" />
          <input
            id="file-submit"
            type="submit"
            name="submit"
            value="SUBMIT"
            class="btn btn-success ${this.showLoadingIndicator
              ? 'pointer-none'
              : ''}"
          />
        </form>
      </div>
    `;
  }

  render() {
    let selectRegion;

    if (this.type !== 'full') {
      selectRegion = html`
        <div id="select-region">
          <input
            id="file-selector"
            name="file"
            type="file"
            accept="image/*"
            style="display: none;"
          />
          <div class="select-message">
            Drop a new image onto<br />your picture here or<br />
            <a href="#" id="upload-region">select an image to upload</a>
          </div>
        </div>
      `;
    }

    return html`
      <div class="profile-section">
        <div id="drop-region" class="image-preview">
          <img alt="" src="${this.previewImg}" />
        </div>
        <div class="overlay-icon">+</div>
        ${this.type === 'full' ? this.selfSubmitForm : ''}
      </div>
      ${selectRegion}
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
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
        transform: translate(-50%, -50%);
        background: white;
        text-align: center;
        color: black;
        font-size: 20px;
        display: none;
        padding: 5px;
        width: 16px;
        line-height: 15px;
      }

      .profile-section:hover .overlay-icon {
        display: block;
        z-index: 1;
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
        background: rgb(188, 195, 197);
        position: absolute;
        top: -14px;
        width: 150px;
        display: grid;
        height: 250px;
        padding: 11px;
        justify-content: center;
        z-index: 2;
        border: 3px solid rgb(204, 204, 204);
        border-radius: 5px;
        justify-items: center;
        left: -29px;
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

      .close-button {
        position: absolute;
        right: 0px;
        top: 0px;
        height: 20px;
        width: 20px;
        padding: 0;
        margin: 0;
        border-radius: 100%;
      }

      #save-button {
        width: 80px;
      }

      .file-error {
        font-size: 14px;
        text-align: center;
        display: block;
        text-overflow: ellipsis;
        word-wrap: unset;
        overflow: hidden;
        height: 30px;
        line-height: 15px;
        color: #000;
      }

      ia-activity-indicator {
        display: inline-block;
        width: 20px;
        color: white;
        --activityIndicatorLoadingRingColor: #fff;
        --activityIndicatorLoadingDotColor: #fff;
      }

      .pointer-none {
        pointer-events: none;
      }
    `;
  }
}
