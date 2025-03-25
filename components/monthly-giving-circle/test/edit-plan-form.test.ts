// eslint-disable-next-line import/no-extraneous-dependencies
import { html, fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';

import type { IauxEditPlanForm } from '../edit-plan-form';
import '../src/edit-plan-form';
import { MonthlyPlan } from '../models/plan';

describe('IauxEditPlanForm', () => {
  it('has cancel form', async () => {
    const el = await fixture<IauxEditPlanForm>(
      html`<ia-mgc-edit-plan
        .plan=${new MonthlyPlan({
          token: 'a.va.lid.T0ken',
          amount: 5,
          currency: 'USD',
          start_date: '2024-07-01 00:00:00',
          is_test: true,
          btdata: {
            billingDayOfMonth: 22,
            nextBillingDate: {
              date: '2024-08-22 00:00:00.000000',
              timezone_type: 3,
              timezone: 'UTC',
            },
            status: 'Active',
            paymentMethodType: 'Venmo',
            last4: null,
            cardType: null,
            expirationMonth: null,
            expirationYear: null,
          },
        })}
      ></ia-mgc-edit-plan>`
    );

    await el.updateComplete;

    const cancelForm = el.shadowRoot!.querySelector('ia-mgc-cancel-plan');

    el.cancelPlanHandler = Sinon.stub();
    await el.updateComplete;

    cancelForm!.dispatchEvent(new Event('cancelPlan'));
    expect(el.cancelPlanHandler).to.have.been.called;
  });
});
