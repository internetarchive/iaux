export interface RecaptchaManagerInterface {
  execute(): Promise<string>;
  setup(
    container: HTMLElement,
    tabIndex: number,
    theme: ReCaptchaTheme,
    type: ReCaptchaType
  ): void;
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

  constructor(options: {
    grecaptchaLibrary: any,
    siteKey: string
  }) {
    this.grecaptchaLibrary = options.grecaptchaLibrary;
    this.siteKey = options.siteKey;
  }

  private executionSuccessBlock?: (token: string) => void;

  private executionExpiredBlock?: () => void;

  private isExecuting = false;

  /**
   * Execute Recaptcha and return a Promise containing the response token.
   *
   * This is an interesting flow.. we call `execute()` here, but have to wait for the
   * response and expiration handlers that we bind during the inital `setup` call.
   * For consumers, we want to be able to just call `execute()` and wait for a response.
   * To allow this, we assign two callbacks:
   * - `executionSuccessBlock`
   * - `executionExpiredBlock`
   *
   * We then call those callbacks from inside `responseHandler` and `expiredHandler` to
   * either resolve or reject the Promise.
   *
   * ie:
   *
   * try {
   *   const recaptchaResult = await recaptchaManager.execute();
   *   console.log('recaptcha token:', recaptchaResult);
   * } catch {
   *   console.error('something happened')
   * }
   *
   * @returns {Promise<string>}
   * @memberof RecaptchaManager
   */
  execute(): Promise<string> {
    console.debug('execute');

    if (this.isExecuting) {
      return new Promise((resolve, reject) => { reject('Execution already in progress.'); });
    }
    this.isExecuting = true;
    this.grecaptchaLibrary.execute();
    return new Promise((resolve, reject) => {
      this.executionSuccessBlock = (token: string) => {
        this.finishExecution();
        resolve(token);
      }

      this.executionExpiredBlock = () => {
        this.finishExecution();
        reject();
      }
    });
  }

  private finishExecution() {
    this.isExecuting = false;
    this.grecaptchaLibrary.reset();
  }

  setup(options: {
    container: HTMLElement,
    tabIndex: number,
    theme: ReCaptchaTheme,
    type: ReCaptchaType
  }): void {
    this.grecaptchaLibrary.render(options.container, {
      callback: this.responseHandler.bind(this),
      'expired-callback': this.expiredHandler.bind(this),
      sitekey: this.siteKey,
      tabindex: options.tabIndex,
      theme: options.theme,
      type: options.type,
      size: 'invisible'
    });
  }

  private responseHandler(response: any): void {
    if (this.executionSuccessBlock) {
      this.executionSuccessBlock(response);
      this.executionSuccessBlock = undefined;
    }
  }

  private expiredHandler(): void {
    if (this.executionExpiredBlock) {
      this.executionExpiredBlock();
      this.executionExpiredBlock = undefined;
    }
  }
}
