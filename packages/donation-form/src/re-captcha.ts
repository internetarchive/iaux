import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
  PropertyValues,
  query,
} from 'lit-element';

export enum ReCaptchaTheme {
  Dark = 'dark',
  Light = 'light'
}

export enum ReCaptchaType {
  Image = 'image',
  Audio = 'audio'
}

@customElement('re-captcha')
export class ReCaptcha extends LitElement {
  @property({ type: String }) siteKey = '6LeTUvYUAAAAAPTvW98MaXyS8c6vxk4-9n8DI1ve';

  @property({ type: Number }) tabIndex = 0;

  @property({ type: String }) theme: ReCaptchaTheme = ReCaptchaTheme.Light;

  @property({ type: String }) type: ReCaptchaType = ReCaptchaType.Image;

  @query('.re-captcha') reCaptchaDiv!: HTMLElement;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="re-captcha"></div>
    `;
  }

  /** inheritdoc */
  firstUpdated(): void {
    this.setupReCaptcha();
  }

  async setupReCaptcha(): Promise<any> {
    return window.grecaptcha.render(this.reCaptchaDiv, {
      callback: this.responseHandler.bind(this),
      "expired-callback": this.expiredHandler.bind(this),
      sitekey: this.siteKey,
      tabindex: this.tabIndex,
      theme: this.theme,
      type: this.type,
      size: 'invisible'
    });
  }

  private responseHandler(response: any): void {
    console.log('responseHandler', response);
  }

  private expiredHandler(): void {
    console.log('expiredHandler');
  }

  /** inheritdoc */
  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    return this;
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
