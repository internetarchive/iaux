import { html } from 'lit-element';

import { PayPalButtonDataSourceInterface, PayPalButtonDataSourceDelegate } from "../braintree-manager/payment-providers/paypal/paypal-button-datasource";
import { DonationResponse } from "../models/response-models/donation-response";
import { ModalManagerInterface } from "../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../braintree-manager/braintree-manager";
import { DonationFrequency } from "../models/donation-info/donation-frequency";
import { DonationPaymentInfo } from "../models/donation-info/donation-payment-info";
import { ModalConfig } from '../modal-manager/modal-template';

export class PayPalFlowHandler implements PayPalButtonDataSourceDelegate {
  private paypalUpsellButtonDataSource?: PayPalButtonDataSourceInterface;

  private paypalDataSource?: PayPalButtonDataSourceInterface;

  private modalManager?: ModalManagerInterface;

  private braintreeManager?: BraintreeManagerInterface;

  updateDonationInfo(donationInfo: DonationPaymentInfo) {
    this.paypalDataSource?.updateDonationInfo(donationInfo);
  }

  updateUpsellDonationInfo(donationInfo: DonationPaymentInfo) {
    this.paypalUpsellButtonDataSource?.updateDonationInfo(donationInfo);
  }

  constructor(
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface
  ) {
    this.braintreeManager = braintreeManager;
    this.modalManager = modalManager;
  }

  payPalPaymentStarted(options: object): void {
    console.debug('PaymentSector:payPalPaymentStarted options:', options);
  }

  payPalPaymentAuthorized(payload: braintree.PayPalCheckoutTokenizePayload, response: DonationResponse): void {
    console.debug('PaymentSector:payPalPaymentAuthorized payload,response', payload,response);
    this.showUpsellModal();
  }

  payPalPaymentCancelled(data: object): void {
    console.debug('PaymentSector:payPalPaymentCancelled data:', data);
  }

  payPalPaymentError(error: string): void {
    console.debug('PaymentSector:payPalPaymentError error:', error);
  }

  async renderPayPalButton(): Promise<void> {
    const donationInfo = new DonationPaymentInfo({
      frequency: DonationFrequency.OneTime,
      amount: 5,
      isUpsell: false
    });

    this.paypalDataSource = await this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton({
      selector: '#paypal-button',
      style: {
        color: 'blue' as paypal.ButtonColorOption, // I'm not sure why I can't access the enum directly here.. I get a UMD error
        label: 'paypal' as paypal.ButtonLabelOption,
        shape: 'rect' as paypal.ButtonShapeOption,
        size: 'small' as paypal.ButtonSizeOption,
        tagline: false
      },
      donationInfo: donationInfo
    });
    if (this.paypalDataSource) {
      this.paypalDataSource.delegate = this;
    }
  }

  async showUpsellModal(): Promise<void> {
    const customContent = html`<slot name="paypal-upsell-button"></slot>`;

    const modalConfig = new ModalConfig();
    modalConfig.headerColor = 'green';
    modalConfig.title = 'Thank You!';
    modalConfig.headline = 'Thanks for becoming a donor!';
    modalConfig.message = 'Would you like to become a monthly supporter?';
    modalConfig.showProcessingIndicator = false;

    this.modalManager?.showModal(modalConfig, customContent);

    if (!this.paypalUpsellButtonDataSource) {
      this.renderUpsellPayPalButton();
    }
  }

  async renderUpsellPayPalButton(): Promise<void> {
    const upsellDonationInfo = new DonationPaymentInfo({
      frequency: DonationFrequency.Monthly,
      amount: 10,
      isUpsell: true
    });

    this.paypalUpsellButtonDataSource = await this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton({
      selector: '#paypal-upsell-button',
      style: {
        color: 'gold' as paypal.ButtonColorOption, // I'm not sure why I can't access the enum directly here.. I get a UMD error
        label: 'paypal' as paypal.ButtonLabelOption,
        shape: 'rect' as paypal.ButtonShapeOption,
        size: 'small' as paypal.ButtonSizeOption,
        tagline: false
      },
      donationInfo: upsellDonationInfo
    });
  }

}
