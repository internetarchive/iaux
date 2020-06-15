import { ModalConfig } from "../modal-manager/modal-template";
import { ModalManagerInterface } from "../modal-manager/modal-manager";
import { SuccessResponse } from "../models/response-models/success-models/success-response";
import { html } from "lit-html";
import { UpsellModalCTAMode } from "../modals/upsell-modal-content";

export interface DonationFlowModalManagerInterface {
  closeModal(): void;
  showProcessingModal(): void;
  showThankYouModal(): void;
  showErrorModal(): void;
  showUpsellModal(params: {
    ctaMode?: UpsellModalCTAMode,
    yesSelected?: (amount: number) => void,
    noSelected?: () => void,
    amountChanged?: (amount: number) => void
  }): void;
}

export class DonationFlowModalManager implements DonationFlowModalManagerInterface {
  private modalManager: ModalManagerInterface;

  constructor(options: {
    modalManager: ModalManagerInterface
  }) {
    this.modalManager = options.modalManager;
  }

  closeModal() {
    this.modalManager.closeModal();
  }

  showProcessingModal() {
    const modalConfig = new ModalConfig();
    modalConfig.showProcessingIndicator = true;
    modalConfig.title = 'Processing...'
    this.modalManager.showModal(modalConfig, undefined);
  }

  showThankYouModal() {
    const modalConfig = new ModalConfig();
    modalConfig.showProcessingIndicator = true;
    modalConfig.processingImageMode = 'complete';
    modalConfig.title = 'Thank You!';
    this.modalManager.showModal(modalConfig, undefined);
  }

  showErrorModal() {
    const modalConfig = ModalConfig.errorConfig;
    this.modalManager.showModal(modalConfig, undefined);
  }

  showUpsellModal(params: {
    yesSelected?: (amount: number) => void,
    noSelected?: () => void,
    amountChanged?: (amount: number) => void,
    ctaMode?: UpsellModalCTAMode
  }) {
    const modalConfig = new ModalConfig();
    const modalContent = html`
      <upsell-modal-content
        .yesButtonMode=${params.ctaMode ?? UpsellModalCTAMode.YesButton}
        @yesSelected=${(e: CustomEvent) => params.yesSelected ? params.yesSelected(e.detail.amount) : ''}
        @noThanksSelected=${params.noSelected}
        @amountChanged=${(e: CustomEvent) => params.amountChanged ? params.amountChanged(e.detail.amount) : ''}>
        <slot name="paypal-upsell-button"></slot>
      </upsell-modal-content>
    `;
    this.modalManager.showModal(modalConfig, modalContent);
  }
}
