export interface BraintreeManagerInterface {
  getBraintreeClient(): Promise<any | undefined>;
  setupHostedFields(): Promise<any | undefined>;
}

export class BraintreeManager implements BraintreeManagerInterface {
  async getBraintreeClient(): Promise<any | undefined> {
    if (this.braintreeClient) {
      return this.braintreeClient;
    }

    return new Promise((resolve, reject) => {
      this.braintree.client.create({
        authorization: this.authorizationToken
      }, (clientErr: any | undefined, clientInstance: any | undefined) => {
        if (clientErr) {
          return reject(clientErr);
        }
        this.braintreeClient = clientInstance;
        resolve(clientInstance);
      });
    });
  }

  async setupHostedFields(): Promise<any | undefined> {
    if (this.hostedFields) {
      return this.hostedFields;
    }

    const braintreeClient = await this.getBraintreeClient();

    return new Promise((resolve, reject) => {
      this.braintree.hostedFields.create({
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

  private braintree: any;

  private authorizationToken: string;

  private hostedFieldStyle: object;

  private hostedFieldConfig: object;

  private braintreeClient: any | undefined;

  private hostedFields: any | undefined;

  constructor(
    braintree: any = window.braintree,
    authorizationToken: string = 'sandbox_x634jsj7_7zybks4ybp63pbmd',
    hostedFieldStyle: object,
    hostedFieldConfig: object
  ) {
    this.authorizationToken = authorizationToken;
    this.braintree = braintree;
    this.hostedFieldStyle = hostedFieldStyle;
    this.hostedFieldConfig = hostedFieldConfig;
  }
}
