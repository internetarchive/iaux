export interface RecaptchaManagerInterface {
  setup(
    container: HTMLElement,
    tabIndex: number,
    theme: ReCaptchaTheme,
    type: ReCaptchaType
  ): void;

  execute(): void;
}

export enum ReCaptchaTheme {
  Dark = 'dark',
  Light = 'light'
}

export enum ReCaptchaType {
  Image = 'image',
  Audio = 'audio'
}

export class RecaptchaManager {
  private grecaptchaLibrary: any;

  private siteKey: string;

  constructor(
    grecaptchaLibrary: any,
    siteKey: string
  ) {
    this.grecaptchaLibrary = grecaptchaLibrary;
    this.siteKey = siteKey;
  }

  execute(): void {
    this.grecaptchaLibrary.execute();
  }

  setup(
    container: HTMLElement,
    tabIndex: number,
    theme: ReCaptchaTheme,
    type: ReCaptchaType
  ): void {
    return this.grecaptchaLibrary.render(container, {
      callback: this.responseHandler.bind(this),
      'expired-callback': this.expiredHandler.bind(this),
      sitekey: this.siteKey,
      tabindex: tabIndex,
      theme,
      type,
      size: 'invisible'
    });
  }

  private responseHandler(response: any): void {
    console.log('responseHandler', response);
  }

  private expiredHandler(): void {
    console.log('expiredHandler');
  }
}
