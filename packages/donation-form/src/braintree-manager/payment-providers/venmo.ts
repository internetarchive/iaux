import { BraintreeManagerInterface } from '../braintree-manager';

export interface VenmoHandlerInterface {
  getVenmoInstance(): Promise<braintree.Venmo | undefined>;
  startPayment(): Promise<any>;
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

  async getVenmoInstance(): Promise<braintree.Venmo | undefined> {
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

  async startPayment(): Promise<any> {
    const instance = await this.getVenmoInstance();

    instance?.tokenize(undefined, (error?: any, payload?: braintree.VenmoTokenizePayload) => {
      console.log('venmo tokenize complete', error, payload);
    });
  }
}
