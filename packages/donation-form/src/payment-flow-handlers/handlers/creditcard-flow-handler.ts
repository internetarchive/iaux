import { html } from 'lit-element';

import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { RecaptchaManagerInterface } from "../../recaptcha-manager/recaptcha-manager";
import { ModalConfig } from "../../modal-manager/modal-template";

import '../../modals/upsell-modal-content';

export interface CreditCardFlowHandlerInterface {
  paymentInitiated(): Promise<void>;
  paymentAuthorized(): Promise<void>;
  paymentCancelled(): Promise<void>;
  paymentError(): Promise<void>;
}

export class CreditCardFlowHandler implements CreditCardFlowHandlerInterface {
  private modalManager: ModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private recaptchaManager: RecaptchaManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface,
    recaptchaManager: RecaptchaManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.modalManager = options.modalManager;
    this.recaptchaManager = options.recaptchaManager;
  }

  // PaymentFlowHandlerInterface conformance
  async paymentInitiated(): Promise<void> {
    let hostedFieldsResponse: braintree.HostedFieldsTokenizePayload | undefined;

    try {
      hostedFieldsResponse = await this.braintreeManager.paymentProviders
        .creditCardHandler?.tokenizeHostedFields()
    } catch {
      alert('Fill in Credit Card');
      return
    }
    console.debug('paymentInitiated', hostedFieldsResponse);
    let recaptchaToken: string | undefined;

    try {
      recaptchaToken = await this.recaptchaManager.execute();
    } catch {
      alert('Verification failed');
      return
    }
    console.debug('paymentInitiated recaptchaToken', recaptchaToken);

    // TODO: submit data to endpoint, then show upsell modal

    const modalConfig = new ModalConfig();
    const modalContent = html`
      <upsell-modal-content
        @yesSelected=${this.yesSelected.bind(this)}
        @noThanksSelected=${this.noThanksSelected.bind(this)}>
      </upsell-modal-content>
    `;
    this.modalManager.showModal(modalConfig, modalContent);
  }

  private yesSelected(e: CustomEvent): void {
    console.debug('yesSelected', e.detail.amount);
    this.modalManager.closeModal();
  }

  private noThanksSelected(): void {
    console.debug('noThanksSelected');
    this.modalManager.closeModal();
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}
}
