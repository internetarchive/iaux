import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { MonthlyPlan } from './models/plan';
import './form-sections/cancel';

@customElement('ia-mgc-edit-plan')
export class IauxEditPlanForm extends LitElement {
  @property({ type: Object }) plan?: MonthlyPlan;

  @property({ type: Object }) cancelPlanHandler?: (plan: MonthlyPlan) => void;

  render() {
    return html`
      <section class="mgc-edit-plan">
        <hr />
        <ia-mgc-cancel-plan
          .plan=${this.plan}
          @cancelPlan=${() => {
            if (this.plan) {
              this.cancelPlanHandler?.(this.plan);
            }
          }}
        ></ia-mgc-cancel-plan>
      </section>
    `;
  }
}
