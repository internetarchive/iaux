import { html, LitElement } from 'lit-element';
import Icon from './icon';

class IconSoftware extends Icon {
  render() {
    return html`
      <svg
        width="23px"
        height="23px"
        viewBox="0 0 23 23"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="Mockups-&amp;-Interactions-(Revised)"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Topnav---mobile---hamburger-open-Copy-2"
            transform="translate(-11.000000, -226.000000)"
            fill="${this.fill}"
          >
            <g id="Media-menu-layer" transform="translate(0.000000, 40.000000)">
              <g id="Media-menu-options" transform="translate(10.000000, 10.000000)">
                <g id="Group-5" transform="translate(0.000000, 176.000000)">
                  <g id="Group-14">
                    <g id="Shape-3" transform="translate(1.000000, 0.000000)">
                      <path
                        d="M17.283237,2.11649772 L5.71676301,2.11649772 L5.71676301,2.24877883 L5.71676301,8.06914755 C5.71676301,8.59827198 6.11560694,8.8628342 6.64739884,8.8628342 L16.3526012,8.8628342 C17.017341,8.8628342 17.283237,8.59827198 17.283237,7.93686644 L17.283237,2.38105993 L17.283237,2.11649772 L17.283237,2.11649772 Z M19.5433526,20.900415 L19.5433526,20.900415 L19.5433526,13.3603918 C19.5433526,12.6989863 19.0115607,12.302143 18.4797688,12.302143 L4.38728324,12.302143 C4.12138728,12.302143 3.98843931,12.4344241 3.72254335,12.5667052 C3.32369942,12.8312674 3.19075145,13.2281107 3.19075145,13.6249541 L3.19075145,20.7681339 L3.19075145,21.0326961 L19.5433526,21.0326961 L19.5433526,20.900415 Z M23,11.3761752 L23,21.6941016 C23,22.4877883 22.6011561,22.8846316 21.8034682,22.8846316 L1.19653179,22.8846316 C0.398843931,22.8846316 1.70530257e-13,22.4877883 1.70530257e-13,21.6941016 L1.70530257e-13,1.19052997 C1.70530257e-13,0.396843322 0.398843931,0 1.19653179,0 L21.8034682,0 C22.6011561,0 23,0.396843322 23,1.19052997 L23,11.3761752 L23,11.3761752 Z"
                        id="Shape"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    `;
  }
}

customElements.define('icon-software', IconSoftware);
