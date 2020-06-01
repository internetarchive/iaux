export default {
  "paymentProvider": "Credit Card",
  "paymentMethodNonce": "fake-payment-nonce",
  "recaptchaToken": "fake-recaptcha-token",
  "customerId": "fake-customer-id",

  "bin": "123456",
  "binName": "Foo Bank of Bar Islands",

  "amount": 5.0,
  "donationType": "one-time",

  "customer": {
    "email": "foo@bar.com",
    "firstName": "Fooey",
    "lastName": "McBarison"
  },
  "billing": {
    "streetAddress": "123 Fake St",
    "extendedAddress": "Apt 123",
    "locality": "San Francisco",
    "region": "CA",
    "postalCode": "94105",
    "countryCodeAlpha2": "US"
  },
  "customFields": {
    "logged_in_user": "some-username",
    "referrer": "https://wayback/some-url",
    "paypal_checkout_id": "if-applicable"
  },
  "options": {
    "submitForSettlement": false
  }
}
