import { BraintreeManagerInterface, BraintreeManager } from "../braintree-manager";

export interface CreditCardHandlerInterface {
  setupHostedFields(): Promise<any | undefined>;
  getHostedFields(): Promise<any | undefined>;
  tokenizeHostedFields(): Promise<any>;
}

export class CreditCardHandler implements CreditCardHandlerInterface {
  constructor(
    braintreeManager: BraintreeManagerInterface,
    hostedFieldsClient: braintree.HostedFields,
    hostedFieldStyle: object,
    hostedFieldConfig: braintree.HostedFieldFieldOptions
  ) {
    this.braintreeManager = braintreeManager;
    this.hostedFieldsClient = hostedFieldsClient;
    this.hostedFieldStyle = hostedFieldStyle;
    this.hostedFieldConfig = hostedFieldConfig;
  }

  private braintreeManager: BraintreeManagerInterface;
  private hostedFieldsClient: braintree.HostedFields;
  private hostedFieldStyle: object;
  private hostedFieldConfig: braintree.HostedFieldFieldOptions;

  private hostedFieldsInstance?: braintree.HostedFields;

  /**
   * This is a convenience wrapper for consumers that don't care about the hosted
   * fields themselves, just to set them up.
   */
  async setupHostedFields(): Promise<any | undefined> {
    return await this.getHostedFields();
  }

  async getHostedFields(): Promise<any | undefined> {
    if (this.hostedFieldsInstance) {
      return this.hostedFieldsInstance;
    }

    const braintreeClient = await this.braintreeManager.getInstance();
    // const braintree = this.braintreeManager.braintree;

    return new Promise((resolve, reject) => {
      this.hostedFieldsClient.create({
        client: braintreeClient,
        styles: this.hostedFieldStyle,
        fields: this.hostedFieldConfig
      }, (hostedFieldsErr: braintree.BraintreeError | undefined, hostedFieldsInstance: braintree.HostedFields) => {
        if (hostedFieldsErr) {
          return reject(hostedFieldsErr);
        }

        this.hostedFieldsInstance = hostedFieldsInstance;
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
