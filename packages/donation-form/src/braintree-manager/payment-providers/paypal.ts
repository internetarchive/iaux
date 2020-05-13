import { BraintreeManagerInterface, HostingEnvironment } from '../braintree-manager';
import { DonationType } from '../../models/donation-info/donation-type';

export interface PayPalHandlerInterface {
  renderPayPalButton(): Promise<any>;
  getPayPalInstance(): Promise<any | undefined>;
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

  async getPayPalInstance(): Promise<any | undefined> {
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

  async renderPayPalButton(): Promise<any> {
    const env = this.hostingEnvironment === HostingEnvironment.Development ? 'sandbox' : 'production';

    console.log('renderPayPalButton');

    this.paypalLibrary.Button.render({
      env,

      style: {
        color: 'blue',
        label: 'paypal',
        size: 'small',
        tagline: false,
      },
      payment: () => {
        const { donationInfo } = this.braintreeManager;

        const frequency = donationInfo.type;
        const flow = frequency === DonationType.OneTime ? 'checkout' : 'vault';
        const { amount } = donationInfo;
        const options = {
          flow,
          enableShippingAddress: true
        };

        let checkoutOptions = {};
        if (flow === 'checkout') {
          checkoutOptions = {
            amount,
            currency: 'USD',
          };
        } else {
          checkoutOptions = {
            billingAgreementDescription: `Subscribe to donate $${amount} monthly`,
          };
        }
        Object.assign(options, checkoutOptions);

        console.log(options, this, this.paypalInstance);

        // const context = Donations.getDonationContext().replace(/^(\w)/, (matches, $1) => $1.toUpperCase());
        // const platform = context === 'Banner' ? Donations.getDonationPlatform() : '';
        // const frequency = Donations.getFrequency() === 'one-time' ? 'OneTime' : 'Monthly';
        // try {
        //   archive_analytics.send_event(
        //     `Donate${context}${platform}`,
        //     `PmtPaypal${frequency}`,
        //     window.location.pathname,
        //     { service: 'ao_no_sampling' }
        //   );
        // } catch (e) {
        //   log('archive_analytics not available on window object');
        // }
        // DonateIframe.postMessage('open modal');

        this.getPayPalInstance().then((instance) => {
          console.log('instance', instance, options);
          instance.createPayment(options);// this.getPaymentOptions());
        });
      },
      onAuthorize: (data: any, actions: any) => {
        // DonateIframe.postMessage('close modal');
        // return instance.tokenizePayment(data, (auth_err, payload) => {
        //   if (auth_err) {
        //     log(auth_err);
        //     return;
        //   }
        //   this.submitPayment(payload);
        //   log(payload);
        // Submit payload.nonce
        // });
        console.log('authorize', data, actions);
      },
      onCancel: (data: object) => {
        // DonateIframe.postMessage('close modal');
        // log('PayPal payment cancelled', JSON.stringify(data, 0, 2));
        console.log('cancel', data);
      },
      onError: (error: string) => {
        // DonateIframe.postMessage('close modal');
        // log(`PayPal error: ${general_err}`);
        console.log('error', error);
      }
    }, '#paypal-button').then(() => {
      console.log('PayPal button set up');
    });
  }

  async startPayment(): Promise<any> {
    const instance = await this.getPayPalInstance();

    instance.tokenize((error: any, payload: object) => {
      console.log('tokenize complete', error, payload);
    });
  }
}
