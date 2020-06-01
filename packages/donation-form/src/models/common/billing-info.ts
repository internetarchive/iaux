export class BillingInfo {
  streetAddress: string | undefined;
  extendedAddress: string | undefined;
  locality: string | undefined;
  region: string | undefined;
  postalCode: string | undefined;
  countryCodeAlpha2: string | undefined;

  constructor(params: {
    streetAddress: string | undefined,
    extendedAddress: string | undefined,
    locality: string | undefined,
    region: string | undefined,
    postalCode: string | undefined,
    countryCodeAlpha2: string | undefined
  }) {
    this.streetAddress = params.streetAddress;
    this.extendedAddress = params.extendedAddress;
    this.locality = params.locality;
    this.region = params.region;
    this.postalCode = params.postalCode;
    this.countryCodeAlpha2 = params.countryCodeAlpha2;
  }
}
