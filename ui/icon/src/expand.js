import IAIconBase from './base.js';

class IAIcon extends IAIconBase {
  constructor() {
    super(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m100.657 0v45l-18.604-17.604-18.59 18.338-8.463-8.463 18.59-18.338-17.933-18.933zm-100.657 99.734v-45l18.604 17.604 18.59-18.338 8.463 8.463-18.59 18.338 17.933 18.933z"/></svg>
`);
  }
}

customElements.define('ia-icon-expand', IAIcon);

export default IAIcon;
