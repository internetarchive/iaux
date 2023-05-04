import IAIconBase from './base.js';

class IAIcon extends IAIconBase {
  constructor() {
    super(`
<svg viewBox="0 0 4 16" xmlns="http://www.w3.org/2000/svg"><path d="m2 4c1.1045695 0 2-.8954305 2-2s-.8954305-2-2-2-2 .8954305-2 2 .8954305 2 2 2zm0 6c1.1045695 0 2-.8954305 2-2s-.8954305-2-2-2-2 .8954305-2 2 .8954305 2 2 2zm0 6c1.1045695 0 2-.8954305 2-2s-.8954305-2-2-2-2 .8954305-2 2 .8954305 2 2 2z" fill="#fff" fill-rule="evenodd"/></svg>
`);
  }
}

customElements.define('ia-icon-kebab', IAIcon);

export default IAIcon;
