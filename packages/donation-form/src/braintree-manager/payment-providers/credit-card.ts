import { BraintreeManagerInterface, BraintreeManager } from "../braintree-manager";

export interface CreditCardHandlerInterface {
  setupHostedFields(): Promise<braintree.HostedFields | undefined>;
  teardownHostedFields(): Promise<any>;
  getInstance(): Promise<braintree.HostedFields | undefined>;
  tokenizeHostedFields(): Promise<braintree.HostedFieldsTokenizePayload | undefined>;
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
  async setupHostedFields(): Promise<braintree.HostedFields | undefined> {
    return await this.getInstance();
  }

  async teardownHostedFields(): Promise<any> {
    console.log('teardownHostedFields', this.hostedFieldsInstance);
    await this.hostedFieldsInstance?.teardown();
    this.hostedFieldsInstance = undefined;
  }

  async getInstance(): Promise<braintree.HostedFields | undefined> {
    if (this.hostedFieldsInstance) {
      console.log('hostedFieldsInstance exists, returning it', this.hostedFieldsInstance);
      return this.hostedFieldsInstance;
    }

    console.log('hostedFieldsInstance does not exist, creating');

    const braintreeClient = await this.braintreeManager.getInstance();

    return new Promise((resolve, reject) => {
      console.log('credit card hostedFieldsClient.create');
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

  async tokenizeHostedFields(): Promise<braintree.HostedFieldsTokenizePayload | undefined> {
    const hostedFields = await this.getInstance();
    return hostedFields?.tokenize();
  }
}
