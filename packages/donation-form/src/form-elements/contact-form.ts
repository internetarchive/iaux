import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  query
} from 'lit-element';
import { BillingInfo } from '../models/common/billing-info';
import { CustomerInfo } from '../models/common/customer-info';
import { DonorContactInfo } from '../models/common/donor-contact-info';

@customElement('contact-form')
export class ContactForm extends LitElement {

  @query('#email') emailField!: HTMLInputElement;
  @query('#firstName') firstNameField!: HTMLInputElement;
  @query('#lastName') lastNameField!: HTMLInputElement;
  @query('#streetAddress') streetAddressField!: HTMLInputElement;
  @query('#extendedAddress') extendedAddressField!: HTMLInputElement;
  @query('#locality') localityField!: HTMLInputElement;
  @query('#region') regionField!: HTMLInputElement;
  @query('#postalCode') postalCodeField!: HTMLInputElement;
  @query('#countryCodeAlpha2') countryCodeAlpha2Field!: HTMLInputElement;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <input type="text" id="email" value="foo@bar.com" placeholder="Email" />
      <input type="text" id="firstName" value="Fooey" placeholder="First name" />
      <input type="text" id="lastName" value="McBarrison" placeholder="Last name" />
      <input type="text" id="streetAddress" value="123 Fake St" placeholder="Address Line 1" />
      <input type="text" id="extendedAddress" value="Apt 2" placeholder="Address Line 2" />
      <input type="text" id="locality" value="SF" placeholder="City" />
      <input type="text" id="region" value="CA" placeholder="State / Province" />
      <input type="text" id="postalCode" value="12345" placeholder="Zip / Postal" />
      <input type="text" id="countryCodeAlpha2" value="US" placeholder="Country" />
    `;
  }

  get donorContactInfo(): DonorContactInfo {
    return new DonorContactInfo({
      billing: this.billingInfo,
      customer: this.contactInfo
    });
  }

  get billingInfo(): BillingInfo {
    const billingInfo = new BillingInfo({
      streetAddress: this.streetAddressField.value,
      extendedAddress: this.extendedAddressField.value,
      locality: this.localityField.value,
      region: this.regionField.value,
      postalCode: this.postalCodeField.value,
      countryCodeAlpha2: 'US'
    });
    return billingInfo;
  }

  get contactInfo(): CustomerInfo {
    return new CustomerInfo({
      email: this.emailField.value,
      firstName: this.firstNameField.value,
      lastName: this.lastNameField.value,
    })
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
