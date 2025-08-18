import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  svg,
  SVGTemplateResult,
  TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import '@internetarchive/ia-activity-indicator';

import { BackendServiceHandler } from './services/backend-service';
import log from './services/log';
import iaButtonStyle from './style/ia-button-style';

@customElement('ia-pic-uploader')
export class IAPicUploader extends LitElement {
  /**
   * user identifier
   *
   * @memberof IAPicUploader
   */
  @property({ type: String }) identifier = '';

  /**
   * basehost where picture will be uploaded
   *
   * @memberof IAPicUploader
   */
  @property({ type: String }) baseHost = 'archive.org';

  /**
   * existing user profile picture
   *
   * @memberof IAPicUploader
   */
  @property({ type: String }) picture = '';

  /**
   * version of the uploader
   * - full version will be used on collection/profile page
   * - compact version will be used on account setting page
   *
   * @memberof IAPicUploader
   */
  @property({ type: String }) type: 'full' | 'compact' = 'compact';

  /**
   * check user is looking at it's our account
   *
   * @memberof IAPicUploader
   */
  @property({ type: Boolean }) lookingAtMyAccount? = false;

  /**
   * max file size in MB
   *
   * @memberof IAPicUploader
   */
  @property({ type: Number }) maxFileSizeInMB = 8;

  /**
   * determine valid file types
   *
   * @memberof IAPicUploader
   */
  @property({ type: Array }) validFileTypes: string[] = [
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  /**
   * determine if need to show ia-activity-indicator
   *
   * @private
   * @type {boolean}
   * @memberof IAPicUploader
   */
  @state() private showLoadingIndicator: boolean = false;

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

  @query('.overlay') private overlay?: HTMLDivElement;

  @query('.plus-icon') private plusIcon?: HTMLDivElement;

  @query('#save-file') private saveFile?: HTMLFormElement;

  @query('.self-submit-form') private selfSubmitEle?: HTMLDivElement;

  @query('.file-selector') private fileSelector?: HTMLFormElement;

  private fileTypeMessage: string = 'Image file must be a JPEG, PNG, or GIF.';

  private fileSizeMessage: string = '';

  private relatedTarget: EventTarget | null = null;

  private fileUploadPath = '/services/post-file.php';

  firstUpdated() {
    this.fileSizeMessage = `Image file must be less than ${this.maxFileSizeInMB}MB.`;
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
      this.profileSection?.classList.add('profile-hover');
    });

    this.dropRegion?.addEventListener('click', () => {
      fakeInput.click();
    });

    this.uploadRegion?.addEventListener('click', () => {
      fakeInput.click();
    });

    fakeInput.addEventListener('change', () => {
      const { files } = fakeInput;
      this.handleSelectedFiles(files as FileList);
    });
  }

  dragOver(e: DragEvent) {
    this.preventDefault(e);
    this.selfSubmitEle?.classList.remove('hidden');

    if (!this.showLoadingIndicator)
      this.selfSubmitEle?.classList.add('drag-over');
    this.overlay?.classList.add('window-drag-over');
  }

  dragLeave(e: DragEvent) {
    this.preventDefault(e);

    if (this.relatedTarget === e.target) {
      if (!this.showLoadingIndicator) {
        this.selfSubmitEle?.classList.remove('drag-over');
        this.selfSubmitEle?.classList.add('hidden');
      }
      this.overlay?.classList.remove('window-drag-over');
    }
  }

  drop(e: DragEvent) {
    this.preventDefault(e);
    this.selfSubmitEle?.classList.remove('drag-over');
    this.overlay?.classList.remove('window-drag-over');
    if (!this.showLoadingIndicator) this.cancelFile();
  }

  /**
   * bind some events for picture uploader
   *
   * @memberof IAPicUploader
   */
  bindEvents() {
    document.addEventListener(
      'dragenter',
      e => {
        this.relatedTarget = e.target;
      },
      false,
    );
    document.addEventListener('dragover', e => this.dragOver(e), false);
    document.addEventListener('dragleave', e => this.dragLeave(e), true);
    document.addEventListener('drop', e => this.drop(e), false);

    [this.overlay, this.dropRegion, this.selfSubmitEle].forEach(element =>
      element?.addEventListener('drop', this.handleDropImage.bind(this), false),
    );

    // execute when submit to save picture
    this.saveFile?.addEventListener(
      'submit',
      this.handleSaveFile.bind(this),
      false,
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
    const validTypes = this.validFileTypes;

    // check the size more than given max file size
    const maxSizeInBytes = (this.maxFileSizeInMB as number) * 1024 * 1024;

    if (validTypes.indexOf(image.type) === -1) {
      this.fileValidationError = this.fileTypeMessage;
      return false;
    }

    if (image.size > maxSizeInBytes) {
      this.fileValidationError = this.fileSizeMessage;
      return false;
    }

    return true;
  }

  /**
   * validate and preview selected image
   *
   * @param {FileList} files
   * @memberof IAPicUploader
   */
  async handleSelectedFiles(files: FileList) {
    const imagePreview = this.selfSubmitEle?.querySelector('.image-preview');
    this.overlay?.classList.remove('window-drag-over');

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

    /**
     * dispatch events to iaux-account-settings
     * - if valid file is selected, hasChanged: true
     * - if file is invalid, error: [error message]
     */
    this.dispatchEvent(
      new CustomEvent('fileChanged', {
        detail: {
          error: this.fileValidationError ?? '',
        },
      }),
    );
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
    this.taskStatus = 'waiting for your tasks to queue';

    // get input file
    const inputFile = this.fileSelector?.files[0];
    const getParams = `identifier=${this.identifier}&fname=${encodeURIComponent(
      inputFile.name,
    )}&submit=1`;

    await BackendServiceHandler({
      action: 'save-file',
      identifier: this.identifier,
      file: inputFile,
      getParam: getParams,
      endpoint: `${this.getPostFileServiceUrl}&fname=${encodeURIComponent(inputFile.name)}`,
      headers: { 'Content-type': 'multipart/form-data; charset=UTF-8' },
      callback: async () => {
        log('callback invoked!', this.type);
        if (this.type === 'full') this.metadataAPIExecution();
      },
    });

    this.dispatchEvent(new Event('fileUploaded'));
    if (this.type === 'compact') this.showLoadingIndicator = false;

    //  clear file input
    if (this.fileSelector) this.fileSelector.value = '';
  }

  get getPostFileServiceUrl(): string {
    return `https://${this.baseHost + this.fileUploadPath}?identifier=${encodeURIComponent(this.identifier)}&submit=1`;
  }

  /**
   * after upload, verify using metadata API if successfully uploaded or not
   *
   * @memberof IAPicUploader
   */
  metadataAPIExecution() {
    const now = Math.round(Date.now() / 1000); // like unix time()

    try {
      const metadataApiInterval = setInterval(async () => {
        const res = BackendServiceHandler({
          action: 'verify-upload',
          method: 'GET',
          endpoint: `https://${this.baseHost}/metadata/${this.identifier}`,
        });
        log('metadata api response', res);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.then((json: any) => {
          const waitCount =
            json.pending_tasks && json.tasks ? json.tasks.length : 0;

          if (waitCount) {
            const adminError = json.tasks.filter(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (e: any) => e.wait_admin === 2,
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
            clearInterval(metadataApiInterval);
            this.taskStatus = 'reloading page with your image';
            // window.location.reload();
          }
        });
      }, 2000);
    } catch (error) {
      this.taskStatus = `upload succeeded but metadata verification failed: ${error}`;
      this.showLoadingIndicator = false;
    }
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
    this.profileSection?.classList.remove('profile-hover');

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

  /**
   * function to render self submit form template
   */
  get selfSubmitFormTemplate(): TemplateResult {
    const formAction = this.getPostFileServiceUrl;

    return html`
      <div class="self-submit-form hidden">
        <button
          class="close-button
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
          : this.plusSVGTemplate(35, 35, '#969696', '#fff')}
        <span
          class="drag-text ${this.showLoadingIndicator ? 'pointer-none' : ''}"
          @keyup=${() => {}}
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
        <span class="error">${this.fileValidationError}</span>
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
          @keyup=${() => {}}
          @click=${() => {
            this.dropRegion?.click();
          }}
        ></div>
      </div>
    `;
  }

  /**
   * function that render html template for compact version
   */
  get selectFileTemplate(): TemplateResult {
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
      <span class="error">${this.fileValidationError}</span>
    `;
  }

  /**
   * function that render html for overlay form compact version
   */
  get overlayTemplate(): TemplateResult {
    return html`
      <div
        class="overlay ${this.showLoadingIndicator
          ? 'show-overlay pointer-none'
          : ''}"
        @keyup="${() => {}}"
        @click=${() => {
          this.dropRegion?.click();
        }}
      >
        ${this.showLoadingIndicator
          ? this.loadingIndicatorTemplate
          : this.plusSVGTemplate(25, 25, '#fff', '#333333')}
      </div>
    `;
  }

  /**
   *  Render svg plus
   *
   * @param {number} height | height for svg
   * @param {number} width  | width for svg
   * @param {string} fill | fill color
   * @param {string} stroke | stroke color
   * @returns {SVGAElement}
   */
  plusSVGTemplate(
    height: number,
    width: number,
    fill: string,
    stroke: string,
  ): SVGTemplateResult {
    return svg`<svg
      class="plus-icon"
      width="${width}"
      height="${height}"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12.8137" cy="13.3699" r="12.5" fill="${fill}"/>
      <path d="M11.3137 5.36987H14.3137V21.3699H11.3137V5.36987Z" fill="${stroke}"/>
      <path d="M4.56366 14.8699V11.8699H21.0637V14.8699H4.56366Z" fill="${stroke}"/>
    </svg>
    `;
  }

  render() {
    return html`
      <div
        class="profile-section profile-hover
        ${!this.lookingAtMyAccount ? 'pointer-none' : ''}
        ${this.type === 'full' ? 'adjust-full' : ''}
      "
      >
        ${this.type === 'compact' ? this.overlayTemplate : nothing}
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
      ${this.type === 'compact' ? this.selectFileTemplate : nothing}
    `;
  }

  static get styles(): CSSResultGroup {
    /* these variable being used for full version */
    const imgMaxHeight = css`var(--imgMaxHeight, 100px)`;
    const imgMaxwidth = css`var(--imgMaxWidth, 200px)`;

    return css`
      ${iaButtonStyle}

      :host {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        display: inline-block;
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
        line-height: normal;
        height: fit-content;
      }

      .adjust-full {
        width: fit-content;
      }

      .profile-section > .full-preview img {
        max-height: ${imgMaxHeight};
        max-width: ${imgMaxwidth};
      }

      .profile-section:hover .overlay {
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

      .profile-hover:hover .self-submit-form {
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
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        position: relative;
        overflow: hidden;
      }

      .overlay:hover + .image-preview img,
      .overlay.window-drag-over + .image-preview img,
      .image-preview:hover img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
        opacity: 0.5;
        cursor: pointer;
      }

      .overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 100%;
        transform: translate(-50%, -50%);
        text-align: center;
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
        z-index: 3;
        justify-items: center;
      }

      @media (max-width: 1350px) {
        .self-submit-form {
          left: 100%;
        }
      }

      .plus-icon {
        pointer-events: none;
      }

      .self-submit-form .full-preview img {
        height: auto;
      }

      .close-button {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        border: none;
        font-size: 1rem;
        background: white;
      }
      .close-button:hover {
        cursor: pointer;
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
        margin-bottom: 15px;
      }

      .window-drag-over {
        display: block;
        z-index: 1;
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

      .error {
        margin: 3px 0px;
        font-size: 1.2rem;
        color: #bb0505;
        overflow: hidden;
        word-wrap: unset;
        display: -webkit-box;
        -webkit-line-clamp: 3;
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
