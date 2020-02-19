import { html, LitElement } from 'lit-element';
import Icon from './icon';

class IconWeb extends Icon {
  render() {
    return html`
      <svg
        width="24px"
        height="18px"
        viewBox="0 0 24 18"
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
            transform="translate(-10.000000, -53.000000)"
            fill="${this.fill}"
          >
            <g id="Media-menu-layer" transform="translate(0.000000, 40.000000)">
              <g id="Media-menu-options" transform="translate(10.000000, 10.000000)">
                <g id="Group">
                  <g id="Group-9">
                    <g id="Shape-5" transform="translate(0.000000, 3.000000)">
                      <path
                        d="M0,17.5185405 L0,9.35772973 L0,1.77635684e-14 L24,1.77635684e-14 L24,9.35772973 L24,17.5185405 L0,17.5185405 L0,17.5185405 Z M14.2702703,1.63216216 L1.83783784,1.63216216 L1.83783784,4.24362162 L14.2702703,4.24362162 L14.2702703,1.63216216 L14.2702703,1.63216216 Z M22.0540541,15.6687568 L22.0540541,8.59605405 L22.0540541,6.74627027 L1.83783784,6.74627027 L1.83783784,8.59605405 L1.83783784,15.6687568 L22.0540541,15.6687568 L22.0540541,15.6687568 Z M18.2702703,1.63216216 L15.5675676,1.63216216 L15.5675676,4.24362162 L18.2702703,4.24362162 L18.2702703,1.63216216 L18.2702703,1.63216216 Z M22.2702703,1.63216216 L19.5675676,1.63216216 L19.5675676,4.24362162 L22.2702703,4.24362162 L22.2702703,1.63216216 L22.2702703,1.63216216 Z"
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
    `
  };
}

customElements.define('icon-web', IconWeb);
