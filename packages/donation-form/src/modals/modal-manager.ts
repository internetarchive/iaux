import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
  query,
} from 'lit-element';

import './modal-template';
import { ModalTemplate } from './modal-template';
import { DonationPaymentInfo } from '../models/donation-info/donation-payment-info';
import { DonationFrequency } from '../models/donation-info/donation-frequency';
import { BraintreeManagerInterface } from '../braintree-manager/braintree-manager';

enum ModalManagerMode {
  Modal = 'modal',
  Closed = 'closed'
}

export class ModalInstance {

}

export interface ModalManagerInterface {
  showModal(options: {
    headerColor?: string,
    title?: string,
    subtitle?: string,
    headline?: string,
    message?: string,
    processingImageMode?: string,
    showProcessingIndicator: boolean,
    content?: TemplateResult,
  }): Promise<ModalInstance>;
}

@customElement('modal-manager')
export class ModalManager extends LitElement implements ModalManagerInterface {

  @property({ type: Object }) braintreeManager: BraintreeManagerInterface | undefined;

  @property({ type: String, reflect: true }) mode: ModalManagerMode = ModalManagerMode.Closed;

  @property({ type: Object }) customContent: TemplateResult | undefined;

  @query('modal-template') modalTemplate!: ModalTemplate;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="container ${this.mode}">
        <div class="backdrop">
          <modal-template>
            ${this.customContent}
          </modal-template>
        </div>
      </div>
    `;
  }

  async showModal(options: {
    title?: string,
    headerColor?: string,
    subtitle?: string,
    headline?: string,
    message?: string,
    processingImageMode?: string,
    showProcessingIndicator: boolean,
    customContent?: TemplateResult,
  }): Promise<ModalInstance> {
    this.customContent = undefined;

    if (options.headerColor) {
      this.modalTemplate.headerColor = options.headerColor;
    }
    if (options.title) {
      this.modalTemplate.title = options.title;
    }
    this.modalTemplate.subtitle = options.subtitle;
    this.modalTemplate.headline = options.headline;
    this.modalTemplate.message = options.message;
    // this.modalTemplate.processingImageMode = options.processingImageMode;
    this.modalTemplate.showProcessingIndicator = options.showProcessingIndicator;
    this.customContent = options.customContent;

    this.mode = ModalManagerMode.Modal;

    return new ModalInstance();

    // $(this.container).append(`
    //   <donation-modal
    //     id="${identifier}"
    //     title="${title}"
    //     subtitle="${subtitle}"
    //     headline="${headline}"
    //     message="${message}"
    //     headerColor="${headerColor}"
    //     processingImageMode="${processingImageMode}">

    //     ${content}

    //   </donation-modal>
    // `);

    // const modal = this.container.querySelector(`#${identifier}`);

    // modal.showProcessingIndicator = showProcessingIndicator;

    // modal.addEventListener(
    //   'close-button-pressed',
    //   this.closeModal.bind(this),
    // );

    // return modal;
  }

  // private async renderUpsellPayPalButton(): Promise<void> {
  //   console.log('render');
  //   const upsellDonationInfo = new DonationPaymentInfo({
  //     frequency: DonationFrequency.Monthly,
  //     amount: 10,
  //     isUpsell: true
  //   });

  //   this.braintreeManager?.paymentProviders.paypalHandler?.renderPayPalButton({
  //     selector: '#paypal-upsell-button',
  //     style: {
  //       color: 'gold' as paypal.ButtonColorOption, // I'm not sure why I can't access the enum directly here.. I get a UMD error
  //       label: 'paypal' as paypal.ButtonLabelOption,
  //       shape: 'rect' as paypal.ButtonShapeOption,
  //       size: 'small' as paypal.ButtonSizeOption,
  //       tagline: false
  //     },
  //     donationInfo: upsellDonationInfo
  //   });
  // }

  firstUpdated() {
    // this.customContent = html`
    //   <slot name="paypal-upsell-button">
    //   </slot>`;

    // this.renderUpsellPayPalButton();
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
      .container {
        width: 100%;
        height: 100%;
      }
      .backdrop {
        background-color: rgba(10, 10, 10, 0.9);
        width: 100%;
        height: 100%;
      }
    `;
  }
}
