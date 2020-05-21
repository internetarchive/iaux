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
      <input type="text" id="email" placeholder="Email" />
      <input type="text" id="firstName" placeholder="First name" />
      <input type="text" id="lastName" placeholder="Last name" />
      <input type="text" id="streetAddress" placeholder="Address Line 1" />
      <input type="text" id="extendedAddress" placeholder="Address Line 2" />
      <input type="text" id="locality" placeholder="City" />
      <input type="text" id="region" placeholder="State / Province" />
      <input type="text" id="postalCode" placeholder="Zip / Postal" />
      <input type="text" id="countryCodeAlpha2" placeholder="Country" />
    `;
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
    // billingInfo.firstName = this.firstNameField.value;
    // billingInfo.lastName = this.lastNameField.value;
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
