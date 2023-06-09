import { html, css, LitElement, CSSResultGroup, nothing } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import type { FilesModel } from './models';
import iaButtonStyle from './style/ia-button-style';
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
   * check user is looking at it's our account
   *
   * @memberof IAPicUploader
   */
  @property({ type: Boolean }) lookingAtMyAccount? = false;

  /**
   * determine if need to show ia-activity-indicator
   *
   * @private
   * @type {boolean}
   * @memberof IAPicUploader
   */
  @state() private showLoadingIndicator?: boolean;

  /**
   * display task's message/error/warning on self submit form
   *
   * @type {string}
   * @memberof IAPicUploader
   */
  @state() taskStatus: string = '';

  /**
   * display file Validation Error on self submit form
   *
   * @type {string}
   * @memberof IAPicUploader
   */
  @state() fileValidationError: string = '';

  @state() showDropper: boolean = false;

  @query('#drop-region') private dropRegion?: HTMLDivElement;

  @query('#upload-region') private uploadRegion?: HTMLDivElement;

  @query('.profile-section') private profileSection?: HTMLDivElement;

  @query('#save-file') private saveFile?: HTMLFormElement;

  @query('.self-submit-form') private selfSubmitEle?: HTMLDivElement;

  @query('.file-selector') private fileSelector?: HTMLFormElement;

  firstUpdated() {
    this.renderInput();
    if (this.lookingAtMyAccount) this.bindEvents();
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

    this.profileSection?.addEventListener('mouseenter', () => {
      this.profileSection?.classList.add('hover-class');
    });

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
    window.addEventListener(
      'dragover',
      e => {
        this.selfSubmitEle?.classList.remove('hidden');
        this.selfSubmitEle?.classList.add('drag-over');
        this.preventDefault(e);
      },
      false
    );

    this.dropRegion?.addEventListener('dragenter', this.preventDefault, false);
    this.dropRegion?.addEventListener('dragleave', this.preventDefault, false);
    this.dropRegion?.addEventListener('dragover', this.preventDefault, false);

    // execute when user drop image
    this.dropRegion?.addEventListener(
      'drop',
      this.handleDropImage.bind(this),
      false
    );

    // execute when uer drop image with ia-pic-uploader type version
    this.selfSubmitEle?.addEventListener(
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

    document?.addEventListener('saveProfileAvatar', (e: Event) => {
      if (this.fileSelector?.files.length) {
        this.handleSaveFile(e);
      }
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
    this.selfSubmitEle?.classList.remove('drag-over');

    if (!this.showLoadingIndicator) {
      const files = event?.dataTransfer?.files;
      if (files?.length) {
        this.handleSelectedFiles(files);
      }
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
    let img: HTMLImageElement;

    if (this.type === 'full') {
      img = document.createElement('img');
    } else {
      img = this.dropRegion?.querySelector('img') as HTMLImageElement;
    }

    img.alt = 'profile picture';

    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target?.result as string;
    };

    if (this.type === 'full') {
      const preview = this.selfSubmitEle?.querySelector('.full-preview');
      preview?.appendChild(img);
    }

    // read the image...
    reader.readAsDataURL(image);

    this.dispatchEvent(new Event('fileChanged'));
  }

  /**
   * validate the selected file extension and size
   *
   * @param {File} image
   * @return {Boolean}
   * @memberof IAPicUploader
   */
  validateImage(image: File): boolean {
    this.fileValidationError = '';

    // check the type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

    // check the size more than 5MB
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (validTypes.indexOf(image.type) === -1) {
      this.fileValidationError = 'file must be  format of JPEG or PNG or GIF.';
      return false;
    }

    if (image.size > maxSizeInBytes) {
      this.fileValidationError = 'file size must be less than 5MB.';
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
    const imagePreview = this.selfSubmitEle?.querySelector('.image-preview');

    if (this.type === 'full') {
      this.selfSubmitEle?.classList.remove('hidden');
    }

    if (files.length && this.validateImage(files[0])) {
      // remove previews preview images
      if (this.type === 'full') {
        while (
          imagePreview?.firstChild &&
          imagePreview.removeChild(imagePreview.firstChild)
        );
      }
      await this.previewImage(files[0]);
      if (this.fileSelector) this.fileSelector.files = files;
    } else {
      if (!files.length) this.cancelFile();
      while (
        imagePreview?.firstChild &&
        imagePreview.removeChild(imagePreview.firstChild)
      );
    }
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
    this.selfSubmitEle?.classList.add('vertical-center');

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
        console.log('callback invoked!', this.type);
        if (this.type === 'full') await this.metadataAPIExecution();
      },
    });

    this.dispatchEvent(new Event('fileUploaded'));
    if (this.type === 'compact') this.showLoadingIndicator = false;

    //  clear file input
    if (this.fileSelector) this.fileSelector.value = '';
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
            this.taskStatus =
              'status task failure -- an admin will need to resolve';
            clearInterval(metadataApiInterval);
          } else {
            this.taskStatus = `waiting for your ${waitCount} tasks to finish`;
          }
        } else if (json.item_last_updated < now) {
          this.taskStatus = 'waiting for your tasks to queue';
        } else {
          console.log('task(s) done!');
          clearInterval(metadataApiInterval);
          this.taskStatus = 'reloading page with your image';
          window.location.reload();
        }
      });
    }, 2000);
  }

  /**
   * fuction to handel closing functionalities
   */
  cancelFile() {
    const imagePreview = this.selfSubmitEle?.querySelector('.image-preview');

    //  clear file input
    if (this.fileSelector) this.fileSelector.value = '';

    this.showDropper = false;
    this.showLoadingIndicator = false;
    this.fileValidationError = '';

    this.selfSubmitEle?.classList.add('hidden');
    this.profileSection?.classList.remove('hover-class');

    while (
      imagePreview?.firstChild &&
      imagePreview.removeChild(imagePreview.firstChild)
    );
  }

  /**
   * function to render loader indicator
   * @returns {HTMLElement} | <ia-activity-indicator>
   */
  get loadingIndicatorTemplate() {
    return html` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`;
  }

  get plusIconTemplate() {
    return html`<div
      class="plusIcon ${this.showLoadingIndicator ? 'pointer-none' : ''}"
      @keyup=""
      @click=${() => {
        this.dropRegion?.click();
      }}
    >
      <span>&#43;</span>
    </div>`;
  }

  /**
   * function to render self submit form template
   * @returns {HTMLElement}
   */
  get selfSubmitFormTemplate() {
    const formAction = encodeURIComponent(
      `${this.endpoint}?identifier=${this.identifier}&submit=1`
    );

    return html`
      <div
        class="self-submit-form hidden
      "
      >
        <button
          class="close-button ia-button 
          ${(!this.showDropper && this.fileValidationError === '') ||
          this.showLoadingIndicator
            ? 'hidden'
            : ''}
          ${this.showLoadingIndicator ? 'pointer-none' : ''}"
          @click=${() => {
            this.cancelFile();
          }}
        >
          &#10060;
        </button>
        ${this.showLoadingIndicator
          ? this.loadingIndicatorTemplate
          : this.plusIconTemplate}
        <span
          class="drag-text ${this.showLoadingIndicator ? 'pointer-none' : ''}"
          @keyup=""
          @click=${() => {
            this.dropRegion?.click();
          }}
          >${this.taskStatus
            ? this.taskStatus
            : 'Drag & Drop an image file here or'}</span
        >
        <button
          id="file-picker"
          @click=${() => {
            this.dropRegion?.click();
          }}
          class="ia-button primary ${this.showLoadingIndicator
            ? 'pointer-none hidden'
            : ''}"
        >
          Pick image to upload
        </button>
        <div
          class="validationErrorDiv"
          style="display:${this.fileValidationError === '' ? 'none' : 'block'}"
        >
          <span class="fileValidationError">${this.fileValidationError}</span>
        </div>
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
            class="ia-button
            ${!this.showDropper || this.fileValidationError !== ''
              ? 'hidden'
              : ''}
            ${this.fileValidationError || this.showLoadingIndicator
              ? 'pointer-none hidden'
              : ''}"
          >
            ${this.showLoadingIndicator
              ? this.loadingIndicatorTemplate
              : 'Submit'}
          </button>
        </form>
        <div
          class="image-preview full-preview 
          ${this.showLoadingIndicator ? 'pointer-none hidden' : ''}"
          @keyup=""
          @click=${() => {
            this.dropRegion?.click();
          }}
        ></div>
      </div>
    `;
  }

  /**
   * function that render html template for compact version
   * @returns {HTMLElement}
   */
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
          <a
            href="#"
            id="upload-region"
            class="${this.showLoadingIndicator ? 'pointer-none' : ''}"
            >select an image to upload</a
          >
        </div>
      </div>
    `;
  }

  /**
   * function that render html for overlay form compact version
   * @returns {HTMLElement}
   */
  get getOverlayIcon() {
    return html`
      <div
        class="overlay-icon ${this.showLoadingIndicator
          ? 'show-overlay pointer-none'
          : ''}"
        @keyup=""
        @click=${() => {
          this.dropRegion?.click();
        }}
      >
        ${this.showLoadingIndicator ? this.loadingIndicatorTemplate : '+'}
      </div>
    `;
  }

  render() {
    return html`
      <div
        class="profile-section hover-class 
        ${!this.lookingAtMyAccount ? 'pointer-none' : ''}
        ${this.type === 'full' ? 'adjust-full' : ''}
      "
      >
        ${this.type === 'compact' ? this.getOverlayIcon : nothing}
        <div
          id="drop-region"
          class="image-preview 
            ${this.type === 'full' ? 'full-preview' : ''}
            ${this.showLoadingIndicator ? 'pointer-none' : ''}"
        >
          <img alt="user profile" src="${this.picture}" />
        </div>
        ${this.type === 'full' ? this.selfSubmitFormTemplate : nothing}
      </div>
      ${this.type === 'compact' ? this.getSelectFileTemplate : nothing}
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      ${iaButtonStyle}

      :host {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      :host *:focus,
      :host *:focus-visible {
        outline: none;
      }

      a,
      a:hover,
      a:focus {
        color: #4b64ff;
      }

      .profile-section,
      .select-region {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        position: relative;
        font-size: 1.4rem;
      }

      .profile-section {
        border-radius: 100%;
        width: fit-content;
        height: fit-content;
      }

      .adjust-full {
        text-align: left;
        width: fit-content;
      }

      .profile-section > .full-preview img {
        max-height: 100px;
        max-width: 200px;
      }

      .profile-section:hover .overlay-icon {
        display: block;
        z-index: 1;
      }

      .show-overlay {
        display: block !important;
        z-index: 1;
        background: none !important;
      }

      .show-overlay + .image-preview img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
        opacity: 0.2;
      }

      .hover-class:hover .self-submit-form {
        display: block;
      }

      .image-preview {
        border-radius: 100%;
      }

      .image-preview img {
        height: 120px;
        width: 120px;
        max-height: 120px;
        max-width: 120px;
        background-size: cover;
        border-radius: 50%;
        box-shadow: rgb(0 0 0 / 5%) 0px 0px 35px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        position: relative;
        overflow: hidden;
      }

      .overlay-icon:hover + .image-preview img,
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
        color: rgb(158 150 150);
        cursor: pointer;
        font-size: 2rem;
        font-weight: bold;
        display: none;
        padding: 5px;
        min-width: 16px;
        line-height: 1.5rem;
      }

      .full-preview img {
        cursor: default;
        width: auto;
        height: 100%;
        border-radius: 0% !important;
      }

      .vertical-center {
        top: 10px !important;
      }

      .self-submit-form {
        box-sizing: border-box;
        background: white;
        border: 3px solid #ccc;
        border-radius: 10px;
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 200px;
        padding: 11px;
        text-align: center;
        justify-content: center;
        z-index: 2;
        justify-items: center;
      }

      .self-submit-form .full-preview img {
        height: auto;
      }

      .close-button {
        position: absolute;
        right: 10px;
        padding: 5px;
        border: none;
        font-size: 1rem;
        background: white;
      }

      .self-submit-form.drag-over {
        border: 3px dashed #ccc;
      }

      .self-submit-form .drag-text {
        font-weight: bold;
        font-size: 1.2rem;
        cursor: default;
        color: #000;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .plusIcon {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }

      .plusIcon span {
        cursor: default;
        height: 40px;
        width: 40px;
        color: #fff;
        background-size: cover;
        background-color: #aaa;
        border-radius: 50%;
        font-size: 4rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .hidden {
        display: none;
      }

      .pointer-none {
        pointer-events: none;
      }

      #file-picker {
        margin: 2px auto;
        padding: 0 1rem;
      }

      #file-submit {
        padding: 0 1rem;
        margin: 4px auto;
        background-color: #5cb85c;
        justify-content: center;
        width: 8rem;
        border-color: #4cae4c;
      }

      #file-submit:hover {
        background-color: #47a447;
        border-color: #398439;
      }

      .validationErrorDiv {
        margin: 5px 0;
      }

      .validationErrorDiv .fileValidationError {
        text-align: center;
        word-wrap: unset;
        overflow: hidden;
        line-height: 1.4rem;
        font-size: 1.1rem;
        font-weight: bold;
        color: #f00;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .self-submit-form ia-activity-indicator {
        display: inline-block;
        width: 20px;
        color: white;
        margin-top: 2px;
        --activityIndicatorLoadingRingColor: #000;
        --activityIndicatorLoadingDotColor: #000;
      }

      .show-overlay ia-activity-indicator {
        display: inline-block;
        width: 25px;
        color: white;
        margin-top: 2px;
        --activityIndicatorLoadingRingColor: #000;
        --activityIndicatorLoadingDotColor: #000;
      }
    `;
  }
}
