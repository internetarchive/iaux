/* eslint-disable no-debugger */

import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './welcome-message';
import './plans';
import './presentational/mgc-title';
import './receipts';
import type { IauxMgcReceipts } from './receipts';
import '../elements/ia-button';
import type { MonthlyPlan } from './models/plan';

export type APlanUpdate = {
  plan?: MonthlyPlan;
  donationId?: string;
  status: 'success' | 'fail';
  action: 'receiptSent' | 'cancel';
  message: string;
};

@customElement('ia-monthly-giving-circle')
export class MonthlyGivingCircle extends LitElement {
  @property({ type: String }) patronName: string = '';

  @property({ type: Array }) receipts = [];

  @property({ type: Array }) updates: APlanUpdate[] = [];

  @property({ type: Array }) plans = [];

  @property({ type: Object }) editingThisPlan?: MonthlyPlan;

  @property({ type: String, reflect: true }) viewToDisplay:
    | 'welcome'
    | 'receipts'
    | 'plans' = 'welcome';

  protected createRenderRoot() {
    return this;
  }

  updated(changed: PropertyValues) {
    if (changed.has('plans')) {
      this.viewToDisplay = this.plans.length ? 'plans' : 'welcome';
    }
  }

  protected render() {
    return html` ${this.sectionTitle} ${this.currentView} `;
  }

  get receiptListElement(): IauxMgcReceipts {
    return this.querySelector('ia-mgc-receipts') as IauxMgcReceipts;
  }

  /* Update Callback */
  updateReceived(update: APlanUpdate) {
    // log update
    this.updates.unshift(update);

    const { plan, donationId = '' } = update;
    const idToUse = plan?.id ?? donationId;

    this.receiptListElement.emailSent({
      id: idToUse,
      emailStatus: update.status,
    });
  }

  /* VIEWS */
  get currentView(): TemplateResult {
    if (this.viewToDisplay === 'receipts') {
      return this.receiptsView;
    }

    if (this.viewToDisplay === 'plans' && this.plans.length) {
      return this.plansView;
    }

    return html`<ia-mgc-welcome
      .patronName=${this.patronName}
    ></ia-mgc-welcome>`;
  }

  get receiptsView(): TemplateResult {
    return html` <ia-mgc-receipts
      .receipts=${this.receipts}
      @EmailReceiptRequest=${(event: CustomEvent) => {
        console.log('EmailReceiptRequest', event.detail);
        this.dispatchEvent(
          new CustomEvent('EmailReceiptRequest', {
            detail: { ...event.detail },
          })
        );
      }}
    ></ia-mgc-receipts>`;
  }

  get plansView(): TemplateResult {
    return html` <ia-mgc-plans .plans=${this.plans}></ia-mgc-plans> `;
  }

  get sectionTitle(): TemplateResult {
    let title = '';
    let titleStyle = '';
    let cta = html``;

    const receiptsCTA = html`
      <ia-button
        class="link slim"
        .clickHandler=${async () => {
          this.viewToDisplay = 'receipts';
          await this.updateComplete;
          this.dispatchEvent(new CustomEvent('ShowReceipts'));
        }}
      >
        View recent donation history
      </ia-button>
    `;

    const displayReceiptsLink =
      this.receipts.length &&
      (this.viewToDisplay === 'plans' || this.viewToDisplay === 'welcome');

    switch (this.viewToDisplay) {
      case 'receipts':
        title = 'Recent donations';
        titleStyle = 'default';
        cta = html`<ia-button
          class="link slim"
          id="close-receipts"
          .clickHandler=${async () => {
            this.viewToDisplay = this.plans.length ? 'plans' : 'welcome';
            this.dispatchEvent(new CustomEvent('ShowWelcome'));
            this.updates = [];
            await this.updateComplete;
          }}
        >
          Back to account settings
        </ia-button>`;
        break;

      default:
        title = 'Monthly Giving Circle';
        titleStyle = 'heart';
        if (displayReceiptsLink) {
          cta = receiptsCTA;
        }
        break;
    }

    return html`
      <ia-mgc-title titleStyle=${titleStyle}>
        <span slot="title">${title}</span>
        <span slot="action">${cta}</span>
      </ia-mgc-title>
    `;
  }
}
