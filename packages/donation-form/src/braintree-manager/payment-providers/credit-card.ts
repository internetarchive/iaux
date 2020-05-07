import { BraintreeManagerInterface } from "../braintree-manager";

export interface CreditCardHandlerInterface {
  setupHostedFields(): Promise<any | undefined>;
  getHostedFields(): Promise<any | undefined>;
  tokenizeHostedFields(): Promise<any>;
}

export class CreditCardHandler implements CreditCardHandlerInterface {
  constructor(
    braintreeManager: BraintreeManagerInterface,
    hostedFieldStyle: object,
    hostedFieldConfig: object
  ) {
    this.braintreeManager = braintreeManager;
    this.hostedFieldStyle = hostedFieldStyle;
    this.hostedFieldConfig = hostedFieldConfig;
  }

  private hostedFields: any | undefined;
  private hostedFieldStyle: object;
  private hostedFieldConfig: object;

  private braintreeManager: BraintreeManagerInterface;

  /**
   * This is a convenience wrapper for consumers that don't care about the hosted
   * fields themselves, just to set them up.
   */
  async setupHostedFields(): Promise<any | undefined> {
    return await this.getHostedFields();
  }

  async getHostedFields(): Promise<any | undefined> {
    if (this.hostedFields) {
      return this.hostedFields;
    }

    const braintreeClient = await this.braintreeManager.getBraintreeClient();
    const braintree = this.braintreeManager.braintree;

    return new Promise((resolve, reject) => {
      braintree.hostedFields.create({
        client: braintreeClient,
        styles: this.hostedFieldStyle,
        fields: this.hostedFieldConfig
      }, (hostedFieldsErr: any, hostedFieldsInstance: any) => {
        if (hostedFieldsErr) {
          return reject(hostedFieldsErr);
        }

        this.hostedFields = hostedFieldsInstance;
        resolve(hostedFieldsInstance);
      });
    });
  }

  async tokenizeHostedFields(): Promise<any> {
    const hostedFields = await this.getHostedFields();

    return new Promise((resolve, reject) => {
      hostedFields.tokenize((tokenizeErr: any, payload: any) => {
        if (tokenizeErr) {
          return reject(tokenizeErr);
        }

        resolve(payload);
      });
    });
  }
}
