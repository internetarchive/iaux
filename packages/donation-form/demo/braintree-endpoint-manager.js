export class BraintreeEndpointManager {
  async submitData(data) {
    console.log('submitData', data);

    const response = await fetch('https://review-1963.archive.org/services/donations/braintree-charge.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    console.debug('RESPONSE', response);

    const json = await response.json();

    console.debug('json', json);

    return json;
  }
}
