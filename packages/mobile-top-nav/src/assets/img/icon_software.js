import { html, LitElement } from 'lit-element';
import Icon from './icon';

class IconSoftware extends Icon {
  render() {
    return html`
      <svg height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg" aria-labelledby="softwareTitleID softwareDescID">
        <title id="softwareTitleID">Software icon</title>
        <desc id="softwareDescID">An illustration of a 3.5" floppy disk.</desc>
        <path d="m17.283237 2.11649772h-11.56647399v.13228111 5.82036872c0 .52912443.39884393.79368665.93063583.79368665h9.70520236c.6647398 0 .9306358-.26456222.9306358-.92596776v-5.55580651zm2.2601156 18.78391728v-7.5400232c0-.6614055-.5317919-1.0582488-1.0635838-1.0582488h-14.09248556c-.26589596 0-.39884393.1322811-.66473989.2645622-.39884393.2645622-.5317919.6614055-.5317919 1.0582489v7.1431798.2645622h16.35260115zm3.4566474-9.5242398v10.3179264c0 .7936867-.3988439 1.19053-1.1965318 1.19053h-20.60693641c-.79768786 0-1.19653179-.3968433-1.19653179-1.19053v-20.50357163c0-.79368665.39884393-1.19052997 1.19653179-1.19052997h20.60693641c.7976879 0 1.1965318.39684332 1.1965318 1.19052997z" fill="${this.fill}" fill-rule="evenodd" transform="translate(9 8)"/>
      </svg>
    `;
  }
}

customElements.define('icon-software', IconSoftware);
