import { ModalManagerInterface } from "../../modal-manager/modal-manager";
import { BraintreeManagerInterface } from "../../braintree-manager/braintree-manager";
import { ModalConfig } from "../../modal-manager/modal-template";

export interface VenmoFlowHandlerInterface {
  startup(): Promise<void>;
  paymentInitiated(): Promise<void>;
  paymentAuthorized(): Promise<void>;
  paymentCancelled(): Promise<void>;
  paymentError(): Promise<void>;
}

export class VenmoFlowHandler implements VenmoFlowHandlerInterface {
  private modalManager: ModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface,
    modalManager: ModalManagerInterface
  }) {
    this.braintreeManager = options.braintreeManager;
    this.modalManager = options.modalManager;
  }

  /**
   * Check if we have any results from Venmo on startup.
   *
   * This happens if the app redirects to us in a new tab so we can resume the session.
   *
   * @returns {Promise<void>}
   * @memberof VenmoFlowHandler
   */
  async startup(): Promise<void> {
    console.debug('Venmo startup');
    const instance = await this.braintreeManager.paymentProviders.venmoHandler?.getInstance();
    if (instance?.hasTokenizationResult()) {
      console.debug('Venmo startup, has tokenization results');
      this.paymentInitiated();
    }
  }

  // VenmoFlowHandlerInterface conformance
  async paymentInitiated(): Promise<void> {
    try {
      const result = await this.braintreeManager.paymentProviders.venmoHandler?.startPayment();
      console.debug('paymentInitiated', result);
      this.showModal();
    } catch(tokenizeError) {
      this.handleTokenizationError(tokenizeError);
    }
  }

  private handleTokenizationError(tokenizeError: any) {
    console.debug('tokenizeError', tokenizeError);
    // Handle flow errors or premature flow closure
    switch (tokenizeError.code) {
      case 'VENMO_APP_CANCELED':
        console.log('User canceled Venmo flow.');
        break;
      case 'VENMO_CANCELED':
        console.log('User canceled Venmo, or Venmo app is not available.');
        break;
      default:
        console.error('Error!', tokenizeError);
    }
    alert(`Tokenization Error: ${tokenizeError.code}`);
  }

  private showModal() {
    const modalConfig = new ModalConfig();
    this.modalManager.showModal(modalConfig, undefined);
  }

  async paymentAuthorized(): Promise<void> {}

  async paymentCancelled(): Promise<void> {}

  async paymentError(): Promise<void> {}
}
