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
import { ModalTemplate, ModalConfig } from './modal-template';
import { BraintreeManagerInterface } from '../braintree-manager/braintree-manager';

enum ModalManagerMode {
  Modal = 'modal',
  Closed = 'closed'
}

export interface ModalManagerInterface {
  showModal(
    config: ModalConfig,
    customModalContent: TemplateResult | undefined
  ): Promise<void>;
  closeModal(): void;
}

@customElement('modal-manager')
export class ModalManager extends LitElement implements ModalManagerInterface {

  @property({ type: String, reflect: true }) mode: ModalManagerMode = ModalManagerMode.Closed;

  @property({ type: Object }) customModalContent: TemplateResult | undefined;

  @query('modal-template') modalTemplate!: ModalTemplate;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="container ${this.mode}">
        <div class="backdrop">
          <modal-template @closeButtonPressed=${this.closeButtonPressed}>
            ${this.customModalContent}
          </modal-template>
        </div>
      </div>
    `;
  }

  closeModal() {
    this.mode = ModalManagerMode.Closed;
  }

  async showModal(
    config: ModalConfig,
    customModalContent?: TemplateResult | undefined
  ): Promise<void> {
    this.mode = ModalManagerMode.Modal;
    this.customModalContent = undefined;
    this.modalTemplate.config = config;
    this.customModalContent = customModalContent;
  }

  private closeButtonPressed(): void {
    this.mode = ModalManagerMode.Closed;
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
