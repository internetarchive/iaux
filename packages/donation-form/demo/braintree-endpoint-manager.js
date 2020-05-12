export class BraintreeEndpointManager {
  async submitData(data) {
    console.log('submitData, returning sample response', data);

    // const data2 = {
    //   'amount': 5,
    //   'paymentMethodNonce': 'fake-valid-nonce',
    //   'customer': {
    //     'firstName': 'FooName',
    //     'lastName': 'McBarrison',
    //     'email': 'foo@bar.com'
    //   },
    //   'billing': {
    //     'firstName': 'FooName',
    //     'lastName': 'McBarrison',
    //     'streetAddress': '123 Fake St',
    //     'extendedAddress': '',
    //     'locality': 'Springfield',
    //     'region': 'CA',
    //     'postalCode': '12345',
    //     'countryCodeAlpha2': 'US'
    //   },
    //   'customFields': {
    //     'ip_address': '',
    //     'logged_in_user': '',
    //     'referrer': ''
    //   },
    //   'options': {
    //     'submitForSettlement': false
    //   }
    // }

    // console.log('submitData, returning sample response', data2);

    const response = await fetch('https://review-1963.archive.org/services/donations/braintree-charge2.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const rawResponse = await response.json();
    const json = JSON.parse(rawResponse); // not sure why i have to parse here, but will solve that later
    return json;
  }
}
