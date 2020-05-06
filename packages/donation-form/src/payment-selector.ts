import {
  LitElement,
  html,
  css,
  customElement,
  CSSResult,
  TemplateResult,
  property,
  PropertyValues,
  query,
} from 'lit-element';

@customElement('payment-selector')
export class PaymentSelector extends LitElement {
  @property({ type: Object }) braintree: any | undefined;

  @property({ type: Object }) braintreeClient: any | undefined;

  @query('#credit-card') creditCardContainer!: HTMLElement;
  @query('#cvc') cvcFieldContainer!: HTMLElement;
  @query('#expiration') expirationFieldContainer!: HTMLElement;

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <button>Apple Pay</button>
      <button>Google Pay</button>
      <button>Venmo</button>
      <button>PayPal</button>
      <button>Credit Card</button>
      <div>
        <div id="credit-card"></div>
        <div id="cvc"></div>
        <div id="expiration"></div>
        <!-- <input type="text" id="credit-card" placeholder="CC" />
        <input type="text" id="cvc" placeholder="CVC" />
        <input type="text" id="expiration" placeholder="MM/YY" /> -->
      </div>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('braintreeClient')) {
      this.createHostedFields();
    }
  }

  private createHostedFields(): void {
    console.log(this.braintree);
    console.log(window.braintree);
    console.log(this.braintreeClient);

    console.log(this.creditCardContainer);
    console.log(this.cvcFieldContainer);
    console.log(this.expirationFieldContainer);

    // const hostedFieldsStylingConfig = {
    //   input: {
    //     'font-size': '14px',
    //     'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    //     'font-weight': '700',
    //     color: '#333',
    //   },
    //   ':focus': {
    //     color: '#333',
    //   },
    //   '.valid': {
    //   },
    //   '.invalid': {
    //     color: '#b00b00',
    //   },
    // };

    // const hostedFieldsConfig = {
    //   number: {
    //     selector: '#bt_card-number',
    //     placeholder: 'Card number',
    //   },
    //   cvv: {
    //     selector: '#bt_cvv',
    //     placeholder: 'CVC',
    //   },
    //   expirationDate: {
    //     selector: '#bt_expiration',
    //     placeholder: 'MM / YY',
    //   },
    // };


    this.braintree.hostedFields.create({
      client: this.braintreeClient,
      styles: {
        'input': {
          'font-size': '14px',
          'background-color': 'purple'
        },
        'input.invalid': {
          'color': 'red'
        },
        'input.valid': {
          'color': 'green'
        }
      },
      fields: {
        number: {
          container: this.creditCardContainer,
          placeholder: '4111 1111 1111 1111'
        },
        cvv: {
          container: this.cvcFieldContainer,
          placeholder: '123'
        },
        expirationDate: {
          container: this.expirationFieldContainer,
          placeholder: '10/2022'
        }
      }
    }, (hostedFieldsErr: any, hostedFieldsInstance: any) => {
      if (hostedFieldsErr) {
        console.error(hostedFieldsErr);
        return;
      }

      console.log('hostedFieldsInstance', hostedFieldsInstance);

      // submit.removeAttribute('disabled');

      // form.addEventListener('submit', function (event) {
      //   event.preventDefault();

      //   hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
      //     if (tokenizeErr) {
      //       console.error(tokenizeErr);
      //       return;
      //     }

      //     // If this was a real integration, this is where you would
      //     // send the nonce to your server.
      //     console.log('Got a nonce: ' + payload.nonce);
      //   });
      // }, false);
    });
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    return css`
    `;
  }
}
