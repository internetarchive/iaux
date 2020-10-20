import { html, LitElement } from 'lit-element';
import waybackSearchCSS from './styles/wayback-search';
// import searchIcon from './icon-search';
// import logo from './logo';
import './action-button';
import './borrow-program-button';
import './favorite-button';
import './share-button';



class DetailsActionButton extends LitElement {
  static get styles() {
    return waybackSearchCSS;
  }

  static get properties() {
    return {
      identifier: { type: String },
      borrowButton: { type: String },
      favoriteLink: { type: String },
      isFavorited: { type: String },
      collectionName: { type: String },
      showShareButton: { type: String },
      // flagConfig: { type: Object },
      flagConfig: {
        type: Object,
        converter(value) {
          return (value);
        }
      },
    };
  }

  constructor() {
    super();
    this.identifier = '';
    this.borrowButton = '';
    this.favoriteLink = '';
    this.isFavorited = '';
    this.collectionName = '';
    this.showShareButton = '';
    this.flagConfig = {};
    // this.flagConfig = {
    //   threshold: 4,
    //   whitelistec: '',
    //   blacklisted: '',
    //   types: {violence: 'Graphic Violence', porn: 'Graphic Sexual Content'},
    //   item: {},
    //   user: {},
    // };
  }

  render() {
    console.log(this.flagConfig)
    return html`
    <div class="grid-container">
      <borrow-program-button
        .identifier=${this.identifier}
      >
      </borrow-program-button>

      <favorite-button
        .identifier=${this.identifier}
        .collectionName=${this.collectionName}
        .isFavorited=${this.isFavorited}
        .favoriteLink=${this.favoriteLink}
      >
      </favorite-button>

      <share-button
      >
      </share-button>

      <flag-button
        .flagConfig=${this.flagConfig}
      >
      </flag-button>
    </div>
    `;
  }
}

customElements.define('ia-details-action-button', DetailsActionButton);
// export default DetailsActionButton;
