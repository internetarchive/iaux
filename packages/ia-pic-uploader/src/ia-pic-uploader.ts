import {
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  svg,
  SVGTemplateResult,
  TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '@internetarchive/ia-activity-indicator';
import { iaButtonStyles } from '@internetarchive/ia-styles';
import { PicUploaderService } from './services/pic-uploader-service';
import iaPicUploaderStyles from './style/ia-pic-uploader-style';

@customElement('ia-pic-uploader')
export class IAPicUploader extends LitElement {
  /**
   * user identifier
   */
  @property({ type: String }) identifier = '';

  /**
   * baseHost where picture will be uploaded
   */
  @property({ type: String }) baseHost = 'archive.org';

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

  private relatedTarget: EventTarget | null = null;

  private uploaderService!: PicUploaderService;

  firstUpdated() {
    this.uploaderService = new PicUploaderService(this.baseHost);
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

    const validation = this.uploaderService.validateImage(
      files[0],
      this.validFileTypes,
      this.maxFileSizeInMB,
    );

    this.fileValidationError = validation.error ?? '';

    if (!validation?.valid) {
      this.emitFileChangedEvent();
      return;
    }

    // remvoe existing image preview
    this.removeExistingPreview(imagePreview);
    if (files.length && validation.valid) {
      this.previewImage(files[0]);
      if (this.fileSelector) this.fileSelector.files = files;
    }

    this.emitFileChangedEvent();
  }

  /**
   * dispatch event file changed
   */
  emitFileChangedEvent() {
    this.dispatchEvent(
      new CustomEvent('fileChanged', {
        detail: { error: this.fileValidationError ?? '' },
      }),
    );
  }

  /**
   * dispatch file upload status event
   */
  emitFileUploadStatusEvent(error?: string) {
    this.dispatchEvent(
      new CustomEvent('fileUploadStatus', {
        detail: { error: error ?? '' },
      }),
    );
  }

  /**
   * dispatch file verification status event
   */
  emitFileVerificationEvent(error?: string) {
    this.dispatchEvent(
      new CustomEvent('fileVerificationStatus', {
        detail: { error: error ?? '' },
      }),
    );
  }

  clearSelectedFile(): void {
    if (this.fileSelector) this.fileSelector.value = '';
  }

  removeExistingPreview(imagePreview: Element | null | undefined): void {
    if (imagePreview?.firstChild) {
      imagePreview.removeChild(imagePreview.firstChild);
    }
  }

  /**
   * upload image on petabox server using API
   */
  async handleSaveFile(event: Event): Promise<void> {
    this.preventDefault(event);
    this.showLoadingIndicator = true;
    this.selfSubmitEle?.classList.add('vertical-center');
    try {
      const inputFile = this.fileSelector?.files?.[0];
      if (!inputFile) {
        throw new Error('No file selected.');
      }
      this.taskStatus = 'Image uploading...';
      await this.uploaderService.uploadFile(this.identifier, inputFile);

      this.taskStatus = 'Image uploaded successfully.';

      // dispatch only for /account/settings/ page to reset button state
      this.emitFileUploadStatusEvent();

      if (this.type === 'full') {
        await this.verifyUploadsWithMdApi();
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to save file. Please try again later.';

      this.taskStatus = message;
      this.showLoadingIndicator = false;
      this.emitFileUploadStatusEvent(message);
    }

    this.clearSelectedFile();
  }

  /**
   * Verify using MdApi if the selected file is successfully uploaded or not
   */
  async verifyUploadsWithMdApi() {
    try {
      const metadataResult = await this.uploaderService.checkMetadataUntilDone(
        this.identifier,
        (status: string | boolean) => {
          if (typeof status === 'string') {
            this.taskStatus = status;
          }
        },
      );

      if (!metadataResult) {
        throw new Error(this.taskStatus || 'Metadata verification failed.');
      }
      this.emitFileVerificationEvent();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to save file. Please try again later.';

      this.emitFileVerificationEvent(message);
      this.showDropper = false;
      this.showLoadingIndicator = false;
    }
  }

  /**
   * function to handle close file preview
   */
  cancelFile() {
    const imagePreview = this.selfSubmitEle?.querySelector('.image-preview');

    this.clearSelectedFile();
    this.showDropper = false;
    this.showLoadingIndicator = false;
    this.fileValidationError = '';
    this.taskStatus = '';

    this.selfSubmitEle?.classList.add('hidden');
    this.profileSection?.classList.remove('profile-hover');

    this.removeExistingPreview(imagePreview);
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
    const formAction = this.uploaderService?.getPostFileServiceUrl(
      this.identifier,
    );

    return html`
      <div class="self-submit-form hidden">
        <button
          class=${classMap({
            'close-button': true,
            hidden: !this.showDropper || this.showLoadingIndicator,
          })}
          @click=${() => this.cancelFile()}
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
            class=${classMap({
              'ia-button': true,
              hidden: !this.showDropper || this.showLoadingIndicator,
            })}
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
        class=${classMap({
          overlay: true,
          'show-overlay': this.showLoadingIndicator,
          'pointer-none': this.showLoadingIndicator,
        })}
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
   * Render svg plus icon
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
        class=${classMap({
          'profile-section': true,
          'profile-hover': true,
          'pointer-none': !this.lookingAtMyAccount,
          'adjust-full': this.type === 'full',
        })}
      >
        ${this.type === 'compact' ? this.overlayTemplate : nothing}
        <div
          id="drop-region"
          class=${classMap({
            'image-preview': true,
            'full-preview': this.type === 'full',
            'pointer-none': this.showLoadingIndicator,
          })}
        >
          <img alt="user profile" src="${this.picture}" />
        </div>
        ${this.type === 'full' ? this.selfSubmitFormTemplate : nothing}
      </div>
      ${this.type === 'compact' ? this.selectFileTemplate : nothing}
    `;
  }

  static get styles(): CSSResultGroup {
    return [iaButtonStyles, iaPicUploaderStyles];
  }
}
