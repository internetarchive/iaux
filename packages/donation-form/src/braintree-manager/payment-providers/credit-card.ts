import { BraintreeManagerInterface, BraintreeManager } from "../braintree-manager";

export interface CreditCardHandlerInterface {
  setupHostedFields(): Promise<braintree.HostedFields | undefined>;
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

  async getInstance(): Promise<braintree.HostedFields | undefined> {
    if (this.hostedFieldsInstance) {
      return this.hostedFieldsInstance;
    }

    const braintreeClient = await this.braintreeManager.getInstance();
    return this.hostedFieldsClient.create({
      styles: this.hostedFieldStyle,
      client: braintreeClient,
      fields: this.hostedFieldConfig
    });
  }

  async tokenizeHostedFields(): Promise<braintree.HostedFieldsTokenizePayload | undefined> {
    const hostedFields = await this.getInstance();
    return hostedFields?.tokenize();
  }
}
