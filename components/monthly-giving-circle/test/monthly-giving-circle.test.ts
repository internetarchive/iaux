// eslint-disable-next-line import/no-extraneous-dependencies
import { html, fixture, expect } from '@open-wc/testing';

import type { MonthlyGivingCircle } from '../monthly-giving-circle';

import '../monthly-giving-circle';
import type { IauxButton } from '../../elements/ia-button';
import { MonthlyPlan } from '../models/plan';

describe('IauxMonthlyGivingCircle', () => {
  it('displays welcome message on load', async () => {
    const el = await fixture<MonthlyGivingCircle>(
      html`<ia-monthly-giving-circle></ia-monthly-giving-circle>`
    );

    expect(el.viewToDisplay).to.equal('welcome');

    const titleEl = el.querySelector('ia-mgc-title');
    expect(titleEl).to.not.be.null;
    expect(titleEl!.getAttribute('titlestyle')).to.equal('heart');
    expect(titleEl!.children.length).to.equal(2);
    expect((titleEl!.children[0] as HTMLElement).innerText).to.equal(
      'Monthly Giving Circle'
    );

    const welcomeEl = el.querySelector('ia-mgc-welcome');
    const joinLink = welcomeEl!.shadowRoot?.querySelector(
      'a.join-mgc'
    ) as HTMLAnchorElement;
    expect(joinLink).to.not.be.null;
    expect(joinLink.href).to.equal(
      'https://archive.org/donate/?amt=5&contrib_type=monthly&origin=iawww-usrsttng'
    );
  });

  describe('Plans View:', () => {
    it('displays list', async () => {
      const el = await fixture<MonthlyGivingCircle>(
        html`<ia-monthly-giving-circle
          .plans=${[
            new MonthlyPlan({
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
                venmoUsername: 'venmojoe',
              },
            }),
          ]}
        ></ia-monthly-giving-circle>`
      );

      expect(el.viewToDisplay).to.equal('plans');
      expect(el.plans.length).to.equal(1);
    });
  });

  describe('Receipts View - CTA & onclick display:', () => {
    it('Displays receipts CTA when receipts are available', async () => {
      const el = await fixture<MonthlyGivingCircle>(
        html`<ia-monthly-giving-circle
          .receipts=${[
            {
              amount: 9999.99,
              date: '2020-09-01',
              donor: 'John Doe',
              paymentMethod: 'Credit Card',
              status: 'Completed',
              id: 'foo-id-1',
            },
          ]}
        ></ia-monthly-giving-circle>`
      );

      const titleEl = el.querySelector('ia-mgc-title');
      const receiptsButton = titleEl!.querySelector('ia-button') as IauxButton;
      expect(receiptsButton).to.exist;
      expect(receiptsButton!.innerText).to.equal(
        'View recent donation history'
      );

      el.receipts = [];
      await el.updateComplete;

      const newTitleEl = el.querySelector('ia-mgc-title');
      expect(newTitleEl).to.exist;

      const newReceiptsButton = newTitleEl!.querySelector('button');
      expect(newReceiptsButton).to.not.exist;
    });

    it('Display receipts table when receipts CTA is clicked', async () => {
      const el = await fixture<MonthlyGivingCircle>(
        html`<ia-monthly-giving-circle
          .receipts=${[
            {
              amount: 9999.99,
              date: '2020-09-01',
              donor: 'John Doe',
              paymentMethod: 'Credit Card',
              status: 'Completed',
              id: 'foo-id-1',
            },
          ]}
        ></ia-monthly-giving-circle>`
      );

      const titleEl = el.querySelector('ia-mgc-title');
      expect(titleEl).to.exist;

      const receiptsButton = titleEl!.querySelector('ia-button') as IauxButton;

      expect(receiptsButton.innerText).to.equal('View recent donation history');

      const innerButton = receiptsButton.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      innerButton.click();

      await el.updateComplete;

      expect(el.viewToDisplay).to.equal('receipts');

      const welcomeEl = el.querySelector('ia-mgc-welcome');
      expect(welcomeEl).to.not.exist;

      // shows proper title
      const titleEl2 = el.querySelector('ia-mgc-title');
      expect(titleEl2).to.exist;
      expect(titleEl2!.getAttribute('titlestyle')).to.equal('default');
      const titleValueEl = titleEl2?.querySelector(
        'span[slot="title"]'
      ) as HTMLSpanElement;
      expect(titleValueEl).to.exist;
      expect(titleValueEl.innerText).to.equal('Recent donations');

      // shows back button
      const backButton = titleEl2?.querySelector(
        'ia-button#close-receipts'
      ) as IauxButton;
      expect(backButton!.innerText).to.equal('Back to account settings');

      // shows receipts element
      const receiptsEl = el.querySelector('ia-mgc-receipts');
      expect(receiptsEl).to.exist;

      // goes back to welcome page if back button is clicked
      // dig into the shadowRoot to get the button
      backButton.shadowRoot?.querySelector('button')?.click();
      await el.updateComplete;

      expect(el.viewToDisplay).to.equal('welcome');

      const titleEl3 = el.querySelector('ia-mgc-title');
      expect(titleEl3).to.exist;
      expect(titleEl3!.getAttribute('titlestyle')).to.equal('heart');
      const welcomeTitle = titleEl3?.querySelector(
        'span[slot="title"]'
      ) as HTMLSpanElement;
      expect(welcomeTitle.innerText).to.equal('Monthly Giving Circle');
    });
  });
});
