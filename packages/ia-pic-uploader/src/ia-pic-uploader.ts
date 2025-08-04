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
import { iaButtonStyles } from '@internetarchive/ia-styles';
import iaPicUploaderStyles from './style/ia-pic-uploader-style';
import log from './log';

@customElement('ia-pic-uploader')
export class IAPicUploader extends LitElement {
  /**
   * user identifier
   */
  @property({ type: String }) identifier = '';

  /**
   * endpoint where picture will be uploaded
   */
  @property({ type: String }) endpoint =
    'https://archive.org/services/post-file.php';

  /**
   * HTTP request headers to be included when uploading picture to endpoint
   */
  @property({ type: Object }) httpHeaders: Record<string, string> = {};

  /**
   * existing user profile picture
   */
  @property({ type: String }) picture = '';

  /**
   * version of the uploader
   * - full version will be used on collection/profile page
   * - compact version will be used on account setting page
   */
  @property({ type: String }) type: 'full' | 'compact' = 'compact';

  /**
   * check user is looking at it's our account
   */
  @property({ type: Boolean }) lookingAtMyAccount? = false;

  /**
   * max file size in MB
   */
  @property({ type: Number }) maxFileSizeInMB = 8;

  /**
   * determine valid file types
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
   */
  @state() private showLoadingIndicator: boolean = false;

  /**
   * display task's message/error/warning on self submit form
   *
   * @type {string}
   */
  @state() taskStatus: string = '';

  /**
   * display file Validation Error on self submit form
   *
   * @type {string}
   */
  @state() fileValidationError: string = '';

  @state() showDropper: boolean = false;

  @query('#drop-region') private dropRegion?: HTMLDivElement;

  @query('#upload-region') private uploadRegion?: HTMLDivElement;

  @query('.profile-section') private profileSection?: HTMLDivElement;

  @query('.overlay') private overlay?: HTMLDivElement;

  @query('#save-file') private saveFile?: HTMLFormElement;

  @query('.self-submit-form') private selfSubmitEle?: HTMLDivElement;

  @query('.file-selector') private fileSelector?: HTMLFormElement;

  private fileTypeMessage: string = 'Image file must be a JPEG, PNG, or GIF.';

  private fileSizeMessage: string = '';

  private relatedTarget: EventTarget | null = null;

  firstUpdated() {
    this.fileSizeMessage = `Image file must be less than ${this.maxFileSizeInMB}MB.`;
    this.renderInput();
    if (this.lookingAtMyAccount) this.bindEvents();
  }

  /**
   * render input[type=file] on existing picture where user can click or drop a image
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
    document.addEventListener('saveProfileAvatar', (e: Event) => {
      if (this.fileSelector?.files.length) {
        this.handleSaveFile(e);
      }
    });

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
   */
  validateImage(image: File): boolean {
    this.fileValidationError = '';

    // check the size more than given max file size
    const maxSizeInBytes = (this.maxFileSizeInMB as number) * 1024 * 1024;

    if (this.validFileTypes.indexOf(image.type) === -1) {
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
      this.previewImage(files[0]);
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

    const formData = new FormData();
    formData.append('file', inputFile);

    try {
      const saveResponse = await fetch(`${this.endpoint}?${getParams}`, {
        method: 'POST',
        headers: this.httpHeaders,
        body: formData,
        credentials: 'include',
      });
      log('saveResponse', saveResponse);

      if (saveResponse.ok) {
        this.dispatchEvent(new Event('fileUploaded'));
        if (this.type === 'full') this.metadataAPIExecution();
        log('file saved, metadata call started');
      } else {
        log('Failed to save file', saveResponse);
      }
    } catch {
    } finally {
      if (this.type === 'compact') this.showLoadingIndicator = false;

      // clear file input
      if (this.fileSelector) this.fileSelector.value = '';
    }
  }

  /**
   * after upload, verify using metadata API if successfully uploaded or not
   */
  metadataAPIExecution() {
    const now = Math.round(Date.now() / 1000); // like unix time()

    const metadataApiInterval = setInterval(async () => {
      const action = `https://archive.org/metadata/${
        this.identifier
      }?rand=${Math.random()}`;

      const verifyResponse = fetch(action, {
        method: 'GET',
      });
      log('verifyResponse', verifyResponse);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      verifyResponse.then((json: any) => {
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
  get loadingIndicatorTemplate(): TemplateResult {
    return html` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`;
  }

  /**
   * function to render self submit form template
   */
  get selfSubmitFormTemplate(): TemplateResult {
    const formAction = encodeURIComponent(
      `${this.endpoint}?identifier=${this.identifier}&submit=1`,
    );

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
    return css`
      ${iaButtonStyles}
      ${iaPicUploaderStyles}
    `;
  }
}
