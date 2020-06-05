import { DonorContactInfo } from "../../models/common/donor-contact-info";
import { DonationPaymentInfo } from "../../models/donation-info/donation-payment-info";

export interface VenmoRestorationStateHandlerInterface {
  persistState(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo
  ): void;
  restoreState(): Promise<VenmoRestorationState | undefined>;
  clearState(): void;
}

export class VenmoRestorationState {
  contactInfo: DonorContactInfo;
  donationInfo: DonationPaymentInfo;

  constructor(params: {
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo
  }) {
    this.contactInfo = params.contactInfo;
    this.donationInfo = params.donationInfo;
  }
}

export class VenmoRestorationStateHandler implements VenmoRestorationStateHandlerInterface {
  private persistanceKey = 'venmoRestorationStateInfo'

  clearState() {
    localStorage.removeItem(this.persistanceKey);
  }

  persistState(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo
  ): void {
    const venmoRestoration = new VenmoRestorationState({
      contactInfo, donationInfo
    });
    const serialized = JSON.stringify(venmoRestoration);
    localStorage.setItem(this.persistanceKey, serialized);
  }

  async restoreState(): Promise<VenmoRestorationState | undefined> {
    const stored = localStorage.getItem(this.persistanceKey);
    if (!stored) {
      console.error('restoreState: No stored data');
      return undefined;
    }

    console.debug('restoreState, stored data', stored);

    const deserialized = JSON.parse(stored);
    if (!deserialized) {
      console.error('restoreState: Data could not be deserializd');
      return undefined;
    }

    console.debug('Venmo startup, deserialized data', deserialized);
    const donationInfo = new VenmoRestorationState(deserialized);

    return donationInfo;
  }
}
