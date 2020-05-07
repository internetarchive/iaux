import { BraintreeManagerInterface } from "../braintree-manager";

export interface VenmoHandlerInterface {
  getVenmoInstance(): Promise<any | undefined>;
  startPayment(): Promise<any>;
}

export class VenmoHandler implements VenmoHandlerInterface {
  constructor(
    braintreeManager: BraintreeManagerInterface
  ) {
    this.braintreeManager = braintreeManager;
  }

  private braintreeManager: BraintreeManagerInterface;

  private venmoInstance: any | undefined;

  async getVenmoInstance(): Promise<any | undefined> {
    if (this.venmoInstance) {
      return this.venmoInstance;
    }

    const braintreeClient = await this.braintreeManager.getBraintreeClient();
    const braintree = this.braintreeManager.braintree;

    return new Promise((resolve, reject) => {
      braintree.venmo.create({
        client: braintreeClient,
        profileId: '1953896702662410263'
      }, (error: any, instance: any) => {
        console.log('instance', error, instance, instance.merchantIdentifier);
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

    instance.tokenize((error, payload) => {
      console.log('tokenize complete', error, payload);
    });
  }

}
