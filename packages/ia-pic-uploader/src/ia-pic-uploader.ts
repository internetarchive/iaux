import { html, css, LitElement, CSSResultGroup, nothing } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import type { FilesModel } from './models';
import { BackendServiceHandler } from './services/backend-service';
import '@internetarchive/ia-activity-indicator/ia-activity-indicator';

@customElement('ia-pic-uploader')
export class IAPicUploader extends LitElement {
  /**
   * user identifier
   *
   * @memberof IAPicUploader
   */
  @property({ type: String }) identifier = '';

  /**
   * endpoint where picture will be uploaded
   *
   * @memberof IAPicUploader
   */
  @property({ type: String }) endpoint = '/services/post-file.php';

  /**
   * existing user profile picture
   *
   * @memberof IAPicUploader
   */
  @property({ type: String }) picture = '';

  /**
   * version of the uploader
   * - full version will be used on my-uploads page
   * - compact version will be used on account setting page
   *
   * @memberof IAPicUploader
   */
  @property({ type: String }) type? = 'compact';

  /**
   * determine if need to show ia-activity-indicator
   *
   * @private
   * @type {boolean}
   * @memberof IAPicUploader
   */
  @state() private showLoadingIndicator?: boolean;

  /**
   * display message/error/warning on self submit form
   *
   * @type {string}
   * @memberof IAPicUploader
   */
  @state() fileError: string = '';

  @state() showDropper: boolean = false;

  @query('#drop-region') private dropRegion?: HTMLDivElement;

  @query('#upload-region') private uploadRegion?: HTMLDivElement;

  @query('#save-file') private saveFile?: HTMLFormElement;

  @query('.self-submit-form') private selfSubmitEle?: HTMLDivElement;

  @query('.file-selector') private fileSelector?: HTMLFormElement;

  firstUpdated() {
    this.renderInput();
    this.bindEvents();
  }

  /**
   * render input[type=file] on existing picture where user can click or drop a image
   *
   * @memberof IAPicUploader
   */
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
      this.handleSelectedFiles(files);
    });
  }

  /**
   * bind some events for picture uploader
   *
   * @memberof IAPicUploader
   */
  bindEvents() {
    this.dropRegion?.addEventListener('dragenter', this.preventDefault, false);
    this.dropRegion?.addEventListener('dragleave', this.preventDefault, false);
    this.dropRegion?.addEventListener('dragover', this.preventDefault, false);

    // execute when user drop image
    this.dropRegion?.addEventListener(
      'drop',
      this.handleDropImage.bind(this),
      false
    );

    // execute when submit to save picture
    this.saveFile?.addEventListener(
      'submit',
      this.handleSaveFile.bind(this),
      false
    );

    // execute when user change picture
    this.fileSelector?.addEventListener('change', () => {
      const { files } = this.fileSelector!;
      this.handleSelectedFiles(files);
    });
  }

  preventDefault(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * execute when user drop image on input[type=file]
   * @param event
   */
  handleDropImage(event: DragEvent) {
    this.preventDefault(event);

    const files = event?.dataTransfer?.files;
    if (files?.length) {
      this.handleSelectedFiles(files);
    }
  }

  /**
   * display selected picture for preview
   *
   * @param {File} image
   * @memberof IAPicUploader
   */
  previewImage(image: File) {
    this.showDropper = true;

    const img = document.createElement('img');
    img.alt = 'profile picture';

    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target?.result as string;
    };

    if (this.type === 'full') {
      const preview = this.selfSubmitEle?.querySelector('.image-preview');
      preview?.appendChild(img);
    } else {
      this.dropRegion?.appendChild(img);
    }

    // read the image...
    reader.readAsDataURL(image);
  }

  /**
   * validate the selected file extension and size
   *
   * @param {File} image
   * @return {Boolean}
   * @memberof IAPicUploader
   */
  validateImage(image: File): boolean {
    this.fileError = '';

    // check the type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

    // check the size more than 5MB
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (validTypes.indexOf(image.type) === -1) {
      this.fileError = 'invalid image';
      return false;
    }

    if (image.size > maxSizeInBytes) {
      this.fileError = 'not allowed to upload large image';
      return false;
    }

    return true;
  }

  /**
   * validate and preview selected image
   *
   * @param {(FilesModel | any)} files
   * @memberof IAPicUploader
   */
  async handleSelectedFiles(files: FilesModel | any) {
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

      this.previewImage(files[0]);
    }

    if (this.fileSelector) this.fileSelector.files = files;
  }

  /**
   * upload image on petabox server using API
   *
   * @param {Event} event
   * @memberof IAPicUploader
   */
  async handleSaveFile(event: Event) {
    this.preventDefault(event);
    this.showLoadingIndicator = true;

    // get input file
    const inputFile = this.fileSelector?.files[0];
    const getParams = `identifier=${this.identifier}&fname=${encodeURIComponent(
      inputFile.name
    )}&submit=1`;

    await BackendServiceHandler({
      action: 'save-file',
      identifier: this.identifier,
      file: inputFile,
      getParam: getParams,
      endpoint: this.endpoint,
      headers: { 'Content-type': 'multipart/form-data; charset=UTF-8' },
      callback: async () => {
        await this.metadataAPIExecution();
      },
    });
  }

  /**
   * after upload, verify using metadata API if successfully uploaded or not
   *
   * @memberof IAPicUploader
   */
  metadataAPIExecution() {
    const now = Math.round(Date.now() / 1000); // like unix time()

    const metadataApiInterval = setInterval(async () => {
      const res = BackendServiceHandler({
        action: 'verify-upload',
        endpoint: `/metadata/${this.identifier}?rand=${Math.random()}`,
      });
      res.then((json: any) => {
        const waitCount =
          json.pending_tasks && json.tasks ? json.tasks.length : 0;
        if (waitCount) {
          const adminError = json.tasks.filter(
            (e: any) => e.wait_admin === 2
          ).length;
          if (adminError) {
            this.fileError =
              'status task failure -- an admin will need to resolve';
            clearInterval(metadataApiInterval);
          } else {
            this.fileError = `waiting for your ${waitCount} tasks to finish`;
          }
        } else if (json.item_last_updated < now) {
          this.fileError = 'waiting for your tasks to queue';
        } else {
          console.log('task(s) done!');
          clearInterval(metadataApiInterval);
          this.fileError = 'reloading page with your image';
          window.location.reload();
        }
      });
    }, 200000);
  }

  get loadingIndicatorTemplate() {
    return html` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`;
  }

  get selfSubmitFormTemplate() {
    const formAction = encodeURIComponent(
      `${this.endpoint}?identifier=${this.identifier}&submit=1`
    );

    return html`
      <div class="self-submit-form ${!this.showDropper ? 'hidden' : ''}">
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
          action="${formAction}"
        >
          <input
            class="file-selector"
            name="file"
            type="file"
            accept="image/*"
            style="display: none;"
          />
          <input type="hidden" name="identifier" .value="${this.identifier}" />
          <button
            id="file-submit"
            type="submit"
            name="submit"
            value="SUBMIT"
            class="btn btn-success ${this.showLoadingIndicator
              ? 'pointer-none'
              : ''}"
          >
            ${this.showLoadingIndicator
              ? this.loadingIndicatorTemplate
              : 'Save'}
          </button>
        </form>
      </div>
    `;
  }

  get getSelectFileTemplate() {
    return html`
      <div class="select-region">
        <input
          class="file-selector"
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

  render() {
    return html`
      <div class="profile-section">
        <div id="drop-region" class="image-preview">
          <img alt="user profile" src="${this.picture}" />
        </div>
        <div class="overlay-icon">+</div>
        ${this.type === 'full' ? this.selfSubmitFormTemplate : nothing}
      </div>

      ${this.type === 'compact' ? this.getSelectFileTemplate : nothing}
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
      }

      .profile-section,
      .select-region {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        position: relative;
      }

      .profile-section {
        border-radius: 100%;
      }

      .profile-section:hover .overlay-icon {
        display: block;
        z-index: 1;
      }

      .image-preview {
        border-radius: 100%;
        height: fit-content;
      }

      .image-preview img {
        height: 120px;
        width: 120px;
        background-size: cover;
        background-color: #000;
        border-radius: 50%;
        box-shadow: rgb(0 0 0 / 5%) 0px 0px 35px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        position: relative;
        overflow: hidden;
      }

      .image-preview:hover img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
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

      .self-submit-form {
        background: rgb(188, 195, 197);
        position: absolute;
        top: -14px;
        width: 150px;
        display: grid;
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

      .file-selector {
        display: none;
      }

      .close-button {
        position: absolute;
        right: 0;
        top: 0;
      }

      .pointer-none {
        pointer-events: none;
      }

      button,
      input[type='submit'],
      .delete-button {
        width: 100px;
        background: rgb(0, 0, 0);
        border: 1px solid gray;
        color: white;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        max-height: 3.8rem;
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

      .file-error {
        text-align: center;
        display: block;
        text-overflow: ellipsis;
        word-wrap: unset;
        overflow: hidden;
        height: 30px;
        line-height: 17px;
        color: #000;
        margin: 10px 0;
      }

      ia-activity-indicator {
        display: inline-block;
        width: 20px;
        color: white;
        margin: -2px;
        --activityIndicatorLoadingRingColor: #fff;
        --activityIndicatorLoadingDotColor: #fff;
      }
    `;
  }
}
