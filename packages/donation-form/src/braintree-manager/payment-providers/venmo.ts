import { BraintreeManagerInterface } from '../braintree-manager';

export interface VenmoHandlerInterface {
  isBrowserSupported(): Promise<boolean>;
  getInstance(): Promise<braintree.Venmo | undefined>;
  startPayment(): Promise<braintree.VenmoTokenizePayload | undefined>;
}

export class VenmoHandler implements VenmoHandlerInterface {
  constructor(
    braintreeManager: BraintreeManagerInterface,
    venmoClient: braintree.Venmo
  ) {
    this.braintreeManager = braintreeManager;
    this.venmoClient = venmoClient;
  }

  private braintreeManager: BraintreeManagerInterface;

  private venmoClient: braintree.Venmo;

  private venmoInstance: any | undefined;

  async isBrowserSupported(): Promise<boolean> {
    const instance = await this.getInstance();
    return instance?.isBrowserSupported() ?? false;
  }

  async getInstance(): Promise<braintree.Venmo | undefined> {
    if (this.venmoInstance) {
      return this.venmoInstance;
    }

    const braintreeInstance = await this.braintreeManager.getInstance();

    return new Promise((resolve, reject) => {
      this.venmoClient.create({
        client: braintreeInstance,
        profileId: '1953896702662410263'
      }, (error: any, instance: braintree.Venmo) => {
        if (error) {
          return reject(error);
        }

        this.venmoInstance = instance;
        resolve(instance);
      });
    });
  }

  async startPayment(): Promise<braintree.VenmoTokenizePayload | undefined> {
    const instance = await this.getInstance();
    return instance?.tokenize();
  }
}
