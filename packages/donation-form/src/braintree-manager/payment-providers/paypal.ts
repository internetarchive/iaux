import { BraintreeManagerInterface, HostingEnvironment } from '../braintree-manager';
import { DonationFrequency } from '../../models/donation-info/donation-frequency';
import { DonationRequest, DonationRequestPaymentProvider } from '../../models/request_models/donation-request';
import { CustomerInfo } from '../../models/common/customer-info';
import { BillingInfo } from '../../models/common/billing-info';

export interface PayPalHandlerInterface {
  renderPayPalButton(): Promise<any>;
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
      payment: async () => {
        const { donationInfo } = this.braintreeManager;

        const frequency = donationInfo.type;

        console.log(donationInfo);

        // you can't use the proper enum in here because it's in a callback
        const flow: braintree.PayPalCheckoutFlowType =
          (frequency === DonationFrequency.Monthly ? 'vault' : 'checkout') as braintree.PayPalCheckoutFlowType;
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

        console.log('options', options, this, this.paypalInstance);

        const instance = await this.getPayPalInstance();
        return instance?.createPayment(options);
      },
      onAuthorize: async (data: any, actions: any): Promise<braintree.PayPalCheckoutTokenizePayload | undefined> => {
        const instance = await this.getPayPalInstance();
        if (!instance) { return; }
        const payload: braintree.PayPalCheckoutTokenizePayload = await instance.tokenizePayment(data);

        console.log('PAYLOAD', payload);

        const details = payload?.details;

        const customerInfo = new CustomerInfo({
          email: details?.email,
          firstName: details?.firstName,
          lastName: details?.lastName
        });

        const shippingAddress = payload?.shippingAddress;

        const billingInfo = new BillingInfo({
          firstName: details?.firstName,
          lastName: details?.lastName,
          streetAddress: shippingAddress?.line1,
          extendedAddress: shippingAddress?.line2,
          locality: shippingAddress?.city,
          region: shippingAddress?.state,
          postalCode: shippingAddress?.postalCode,
          countryCodeAlpha2: shippingAddress?.countryCode
        })

        const { donationInfo } = this.braintreeManager;

        const request = new DonationRequest({
          paymentProvider: DonationRequestPaymentProvider.PayPal,
          paymentMethodNonce: payload.nonce,
          isUpsell: false,
          amount: donationInfo.amount,
          frequency: donationInfo.type,
          customer: customerInfo,
          billing: billingInfo,
          referrer: undefined,
          customFields: undefined,
          options: undefined
        });

        this.braintreeManager.submitDataToEndpoint(request);

        return payload;

        // donationRequest.amount = donationInfo.amount;
        // donationRequest.frequency = donationInfo.type;

        // donationRequest.billing = billingInfo;
        // donationRequest.customer = customerInfo;

        // amount: number | undefined;
        // customer: CustomerInfo | undefined;
        // billing: BillingInfo | undefined;
        // referrer: string | undefined;
        // frequency: DonationType | undefined;
        // customFields: DonationRequestCustomFields | undefined;
        // options: DonatinoRequestOptions | undefined;


        // type: string;

        // /**
        //  * Additional PayPal account details.
        //  *
        //  * @type {PayPalCheckoutTokenizePayloadDetails}
        //  * @memberof PayPalCheckoutTokenizePayload
        //  */
        // details: PayPalCheckoutTokenizePayloadDetails;

        // /**
        //  * User's shipping address details, only available if shipping address is enabled.
        //  *
        //  * @type {PayPalCheckoutAddress}
        //  * @memberof PayPalCheckoutTokenizePayload
        //  */
        // shippingAddress?: PayPalCheckoutAddress;

        // /**
        //  * User's billing address details.
        //  *
        //  * @type {PayPalCheckoutAddress}
        //  * @memberof PayPalCheckoutTokenizePayload
        //  */
        // billingAddress?: PayPalCheckoutAddress;

        // /**
        //  * This property will only be present when the customer pays with PayPal Credit.
        //  *
        //  * @type {PayPalCheckoutCreditFinancingOptions}
        //  * @memberof PayPalCheckoutTokenizePayload
        //  */
        // creditFinancingOffered?: PayPalCheckoutCreditFinancingOptions;

        // const donationRequest = new DonationRequest({
        //   nonce: payload?.nonce,
        //   amount: donationInfo.amount,

        // })
        // donationRequest.amount = donationInfo.amount
        // donationRequest.frequency = donationInfo.type;

        // this.braintreeManager.submitDataToEndpoint(donationRequest);


        // return payload;
        // this.submit(payload);


        // return instance?.tokenizePayment(data, (auth_err, payload) => {
        //   if (auth_err) {
        //     log(auth_err);
        //     return;
        //   }
        //   this.submitPayment(payload);
        //   log(payload);
        // Submit payload.nonce
        // });
        // console.log('authorize', data, actions);
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

    // instance?.tokenize((error: any, payload: object) => {
    //   console.log('tokenize complete', error, payload);
    // });
  }
}
