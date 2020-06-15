import { html } from 'lit-element';

import { PayPalButtonDataSourceInterface, PayPalButtonDataSourceDelegate } from "../../braintree-manager/payment-providers/paypal/paypal-button-datasource";
import { DonationResponse } from "../../models/response-models/donation-response";
import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { DonationType } from "../../models/donation-info/donation-type";
import { DonationPaymentInfo } from "../../models/donation-info/donation-payment-info";
import { ModalConfig } from '../../modal-manager/modal-template';

import '../../modals/upsell-modal-content';
import { DonationRequest, DonationRequestCustomFields } from '../../models/request_models/donation-request';
import { SuccessResponse } from '../../models/response-models/success-models/success-response';
import { CustomerInfo } from '../../models/common/customer-info';
import { BillingInfo } from '../../models/common/billing-info';
import { PaymentProvider } from '../../models/common/payment-provider-name';
import { DonationFlowModalManagerInterface } from '../donation-flow-modal-manager';
import { UpsellModalCTAMode } from '../../modals/upsell-modal-content';

export interface PayPalFlowHandlerInterface {
  updateDonationInfo(donationInfo: DonationPaymentInfo): void;
  updateUpsellDonationInfo(donationInfo: DonationPaymentInfo): void;
  renderPayPalButton(donationInfo: DonationPaymentInfo): Promise<void>;
}

/**
 * This is a class to combine the data from the one-time purchase to the upsell
 *
 * @class UpsellDataSourceContainer
 */
class UpsellDataSourceContainer {
  upsellButtonDataSource: PayPalButtonDataSourceInterface;
  oneTimePayload: braintree.PayPalCheckoutTokenizePayload;
  oneTimeSuccessResponse: SuccessResponse;

  constructor(options: {
    upsellButtonDataSource: PayPalButtonDataSourceInterface,
    oneTimePayload: braintree.PayPalCheckoutTokenizePayload,
    oneTimeSuccessResponse: SuccessResponse
  }) {
    this.upsellButtonDataSource = options.upsellButtonDataSource;
    this.oneTimePayload = options.oneTimePayload;
    this.oneTimeSuccessResponse = options.oneTimeSuccessResponse;
  }
}

/**
 * This class manages the user-flow for PayPal.
 *
 * @export
 * @class PayPalFlowHandler
 * @implements {PayPalFlowHandlerInterface}
 * @implements {PayPalButtonDataSourceDelegate}
 */
export class PayPalFlowHandler implements PayPalFlowHandlerInterface, PayPalButtonDataSourceDelegate {
  private upsellButtonDataSourceContainer?: UpsellDataSourceContainer;

  private buttonDataSource?: PayPalButtonDataSourceInterface;

  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  updateDonationInfo(donationInfo: DonationPaymentInfo): void {
    console.debug('updateDonationInfo', donationInfo);
    if (this.buttonDataSource) {
      this.buttonDataSource.donationInfo = donationInfo;
    }
  }

  updateUpsellDonationInfo(donationInfo: DonationPaymentInfo): void {
    if (this.upsellButtonDataSourceContainer) {
      this.upsellButtonDataSourceContainer.upsellButtonDataSource.donationInfo = donationInfo;
    }
  }

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    donationFlowModalManager: DonationFlowModalManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
  }

  async payPalPaymentStarted(dataSource: PayPalButtonDataSourceInterface, options: object): Promise<void> {
    console.debug('PaymentSector:payPalPaymentStarted options:', dataSource, dataSource.donationInfo, options);
  }

  async payPalPaymentAuthorized(dataSource: PayPalButtonDataSourceInterface, payload: braintree.PayPalCheckoutTokenizePayload): Promise<void> {
    console.debug('PaymentSector:payPalPaymentAuthorized payload,response', dataSource, dataSource.donationInfo, payload);

    this.donationFlowModalManager.showProcessingModal();

    const donationType = dataSource.donationInfo.donationType;

    const request = this.buildDonationRequest({
      donationInfo: dataSource.donationInfo,
      payload
    });

    if (this.upsellButtonDataSourceContainer) {
      request.upsellOnetimeTransactionId = this.upsellButtonDataSourceContainer.oneTimeSuccessResponse.transaction_id;
    }

    const response: DonationResponse = await this.braintreeManager.submitDataToEndpoint(request);

    if (!response.success) {
      this.donationFlowModalManager.showErrorModal();
      // alert('ERROR DURING payPalPaymentAuthorized');
      console.error('Error during payPalPaymentAuthorized', response);
      return;
    }

    switch (donationType) {
      case DonationType.OneTime:
        console.debug('ONE TIME, SHOW MODAL');
        this.showUpsellModal(payload, response.value as SuccessResponse);
        break;
      case DonationType.Monthly:
        console.debug('MONTHLY, SHOW THANKS');
        // show thank you, redirect
        this.donationFlowModalManager.showThankYouModal()
        break;
      case DonationType.Upsell:
        console.debug('UPSELL, SHOW THANKS');
        // show thank you, redirect
        this.donationFlowModalManager.showThankYouModal()
        break;
    }
  }

  async payPalPaymentCancelled(dataSource: PayPalButtonDataSourceInterface, data: object): Promise<void> {
    console.debug('PaymentSector:payPalPaymentCancelled data:', dataSource, dataSource.donationInfo, data);
  }

  async payPalPaymentError(dataSource: PayPalButtonDataSourceInterface, error: string): Promise<void> {
    console.debug('PaymentSector:payPalPaymentError error:', dataSource, dataSource.donationInfo, error);
  }

  async renderPayPalButton(donationInfo: DonationPaymentInfo): Promise<void> {
    this.buttonDataSource = await this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton({
      selector: '#paypal-button',
      style: {
        color: 'blue' as paypal.ButtonColorOption, // I'm not sure why I can't access the enum directly here.. I get a UMD error
        label: 'paypal' as paypal.ButtonLabelOption,
        shape: 'rect' as paypal.ButtonShapeOption,
        size: 'medium' as paypal.ButtonSizeOption,
        tagline: false
      },
      donationInfo: donationInfo
    });

    if (this.buttonDataSource) {
      this.buttonDataSource.delegate = this;
    }
  }

  private async showUpsellModal(
    oneTimePayload: braintree.PayPalCheckoutTokenizePayload,
    oneTimeSuccessResponse: SuccessResponse
  ): Promise<void> {
    console.debug('showUpsellModal', oneTimePayload, oneTimeSuccessResponse);

    this.donationFlowModalManager.showUpsellModal({
      amountChanged: this.upsellAmountChanged.bind(this),
      noSelected: this.noThanksSelected.bind(this),
      ctaMode: UpsellModalCTAMode.Slot
    });

    const upsellDonationInfo = new DonationPaymentInfo({
      amount: 5, // TODO: <-- this should be dynamic based on the one-time amount
      donationType: DonationType.Upsell,
      coverFees: false
    });

    if (!this.upsellButtonDataSourceContainer) {
      this.renderUpsellPayPalButton({
        donationInfo: upsellDonationInfo,
        oneTimePayload,
        oneTimeSuccessResponse
      });
    }
  }

  private upsellAmountChanged(amount: number): void {
    console.debug('upsellAmountChanged', amount);
    if (this.upsellButtonDataSourceContainer) {
      this.upsellButtonDataSourceContainer.upsellButtonDataSource.donationInfo.amount = amount;
    }
  }

  private noThanksSelected(): void {
    console.debug('noThanksSelected');
    this.donationFlowModalManager.closeModal();
  }

  private async renderUpsellPayPalButton(options: {
    donationInfo: DonationPaymentInfo,
    oneTimePayload: braintree.PayPalCheckoutTokenizePayload,
    oneTimeSuccessResponse: SuccessResponse
  }): Promise<void> {
    const upsellButtonDataSource = await this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton({
      selector: '#paypal-upsell-button',
      style: {
        color: 'gold' as paypal.ButtonColorOption, // I'm not sure why I can't access the enum directly here.. I get a UMD error
        label: 'paypal' as paypal.ButtonLabelOption,
        shape: 'rect' as paypal.ButtonShapeOption,
        size: 'small' as paypal.ButtonSizeOption,
        tagline: false
      },
      donationInfo: options.donationInfo
    });

    if (upsellButtonDataSource) {
      upsellButtonDataSource.delegate = this;
      this.upsellButtonDataSourceContainer = new UpsellDataSourceContainer({
        upsellButtonDataSource: upsellButtonDataSource,
        oneTimePayload: options.oneTimePayload,
        oneTimeSuccessResponse: options.oneTimeSuccessResponse
      });
    } else {
      // this.showErrorModal();
      // alert('ERROR RENDERING UPSELL PAYPAL BUTTON');
      console.error('error rendering paypal upsell button')
    }
  }

  private buildDonationRequest(params: {
    donationInfo: DonationPaymentInfo,
    payload: braintree.PayPalCheckoutTokenizePayload
  }): DonationRequest {
    const details = params.payload?.details;

    const customerInfo = new CustomerInfo({
      email: details?.email,
      firstName: details?.firstName,
      lastName: details?.lastName
    });

    const shippingAddress = details.shippingAddress;

    const billingInfo = new BillingInfo({
      streetAddress: shippingAddress?.line1,
      extendedAddress: shippingAddress?.line2,
      locality: shippingAddress?.city,
      region: shippingAddress?.state,
      postalCode: shippingAddress?.postalCode,
      countryCodeAlpha2: shippingAddress?.countryCode
    })

    const request = new DonationRequest({
      paymentProvider: PaymentProvider.PayPal,
      paymentMethodNonce: params.payload.nonce,
      amount: params.donationInfo.total,
      donationType: params.donationInfo.donationType,
      customer: customerInfo,
      billing: billingInfo,
      customFields: {
        fee_amount_covered: params.donationInfo.feeAmountCovered
      }
    });

    console.debug('buildDonationRequest, request', request);

    return request
  }

}
