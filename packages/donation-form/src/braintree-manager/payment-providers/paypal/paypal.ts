import { BraintreeManagerInterface, HostingEnvironment } from '../../braintree-manager';
import { DonationRequest, DonationRequestPaymentProvider } from '../../../models/request_models/donation-request';
import { CustomerInfo } from '../../../models/common/customer-info';
import { BillingInfo } from '../../../models/common/billing-info';
import { DonationPaymentInfo } from '../../../models/donation-info/donation-payment-info';
import { PayPalButtonDataSourceInterface, PayPalButtonDataSource } from './paypal-button-datasource';
import { DonationFrequency } from '../../../models/donation-info/donation-frequency';

export interface PayPalHandlerInterface {
  renderPayPalButton(params: {
    selector: string,
    style: {
      color: string,
      label: string,
      size: string,
      tagline: boolean
    },
    donationInfo: DonationPaymentInfo
  }): Promise<PayPalButtonDataSourceInterface | undefined>;
  getPayPalInstance(): Promise<braintree.PayPalCheckout | undefined>;
  startPayment(): Promise<any>;
}

export class PayPalHandler implements PayPalHandlerInterface {
  constructor(
    braintreeManager: BraintreeManagerInterface,
    paypalClient: braintree.PayPalCheckout,
    paypalLibrary: any,
    hostingEnvironment: HostingEnvironment
  ) {
    this.braintreeManager = braintreeManager;
    this.paypalClient = paypalClient;
    this.paypalLibrary = paypalLibrary;
    this.hostingEnvironment = hostingEnvironment;

    console.log('PayPalHandler', paypalLibrary, paypalClient);
  }

  private braintreeManager: BraintreeManagerInterface;

  private paypalClient: braintree.PayPalCheckout;

  private paypalLibrary: any;

  private hostingEnvironment: HostingEnvironment;

  private paypalInstance: braintree.PayPalCheckout | undefined;

  async getPayPalInstance(): Promise<braintree.PayPalCheckout | undefined> {
    if (this.paypalInstance) {
      return this.paypalInstance;
    }

    const braintreeClient = await this.braintreeManager.getInstance();
    // const paypalClient = this.braintreeManager.braintree;

    return new Promise((resolve, reject) => {
      this.paypalClient.create({
        client: braintreeClient
      }, (error: any, instance: braintree.PayPalCheckout) => {
        // console.log('instance', error, instance, instance.merchantIdentifier);
        if (error) {
          return reject(error);
        }

        this.paypalInstance = instance;
        resolve(instance);
      });
    });
  }

  // private dataSources: { key: string: PayPalButtonDataSourceInterface } = {}

  // private dataSources: { [selector: string]: PayPalButtonDataSourceInterface } = {};

  async renderPayPalButton(params: {
    selector: string,
    style: {
      color: string,
      label: string,
      size: string,
      tagline: boolean
    },
    donationInfo: DonationPaymentInfo
  }): Promise<PayPalButtonDataSourceInterface | undefined> {
    const env = this.hostingEnvironment === HostingEnvironment.Development ? 'sandbox' : 'production';

    console.log('renderPayPalButton');

    const paypalInstance = await this.getPayPalInstance();
    if (!paypalInstance) { return; }

    const dataSource = new PayPalButtonDataSource({
      donationInfo: params.donationInfo,
      paypalInstance: paypalInstance,
      braintreeManager: this.braintreeManager
    });

    this.paypalLibrary.Button.render({
      env,
      style: params.style,
      payment: dataSource.payment.bind(dataSource),
      onAuthorize: dataSource.onAuthorize.bind(dataSource),
      onCancel: dataSource.onCancel.bind(dataSource),
      onError: dataSource.onError.bind(dataSource)
    }, params.selector).then(() => {
      console.log('PayPal button set up');
    });

    return dataSource;
  }

  async startPayment(): Promise<any> {
    const instance = await this.getPayPalInstance();

    // instance?.tokenize((error: any, payload: object) => {
    //   console.log('tokenize complete', error, payload);
    // });
  }
}
