export class BraintreeEndpointManager {
  async submitData(data) {
    console.log('submitData, returning sample response', data);
    return {
      "success": true,
      "value": {
        "amount": "5",
        "transaction_id": "h0s3pvs6",
        "customer_id": "699461289",
        "paymentMethodNonce": "tokencc_bf_7cdzdd_z7pzfp_65prvm_6kcjwc_4w2",
        "customer": {
          "firstName": "FooName",
          "lastName": "McBarison",
          "email": "foo@bar.com"
        },
        "billing": {
          "streetAddress": "123 Fake St",
          "extendedAddress": "",
          "locality": "Springfield",
          "region": "CA",
          "postalCode": "12345",
          "countryCodeAlpha2": "US"
        },
        "subscription": null
      }
    };
  }
}
