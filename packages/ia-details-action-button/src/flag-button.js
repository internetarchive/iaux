import { html } from 'lit-element';
import TrackedElement from './tracked-element';
// import icons from './assets/img/icons';
import actionButtonCSS from './styles/action-button';

class FlagButton extends TrackedElement {
  static get styles() {
    return actionButtonCSS;
  }

  static get properties() {
    return {
      flagConfig: { type: Object },
    };
  }

  constructor() {
    super();
    this.flagConfig = null;
  }

  render() {
    console.log(this.flagConfig)
    return html`
      <div id="flag-button-container"
        class="topinblock flag-button"
        data-toggle="tooltip"
        data-placement="bottom"
        data-container="body"
        title="Flag this item">
        <?=$this->buildFlagButton()?>
        <?=$this->buildAdminControls()?>
      </div>
    `;
  }
}

customElements.define('flag-button', FlagButton);
