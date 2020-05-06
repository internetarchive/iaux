export class BillingResponse {
  streetAddress: string;
  extendedAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  countryCodeAlpha2: string;

  constructor(params: any) {
    this.streetAddress = params.streetAddress;
    this.extendedAddress = params.extendedAddress;
    this.locality = params.locality;
    this.region = params.region;
    this.postalCode = params.postalCode;
    this.countryCodeAlpha2 = params.countryCodeAlpha2;
  }
}
