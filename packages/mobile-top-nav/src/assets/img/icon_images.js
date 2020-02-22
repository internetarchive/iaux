import { html, LitElement } from 'lit-element';
import Icon from './icon';

class IconImages extends Icon {
  render() {
    return html`
      <svg height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg" aria-labelledby="imagesTitleID imagesDescID">
        <title id="imagesTitleID">Images icon</title>
        <desc id="imagesDescID">An illustration of two photographs.</desc>
        <path d="m12.6111466 5.36728321c0 1.09536392-.8623006 1.86211866-1.8323888 1.86211866-.97008824 0-1.94017643-.87629113-1.94017643-1.86211866s.86230062-1.86211867 1.94017643-1.86211867c.9700882 0 1.8323888.87629114 1.8323888 1.86211867zm-5.82052921-3.72423733h15.19804841v5.91496517l-1.9401764-3.28609176-2.5869018 6.24357431-2.1557516-2.62887337-6.03610432 5.03867407h-2.47911429zm-1.72460124-1.64304588v14.6778765h18.53946335v-14.6778765zm-2.9102646 7.11986548c.21557516 0 1.9401764-.32860917 1.9401764-.32860917v-1.97165506l-4.09592795.54768196c.43115031 4.71006489.86230062 9.74873889 1.29345093 14.45880379 5.92831677-.547682 13.04229687-1.5335095 19.07840127-2.0811915-.1077876-.547682-.1077876-1.971655-.2155752-2.6288734-.4311503.1095364-1.4012385 0-1.8323888.1095364v.8762911c-5.0660162.4381456-10.1320323 1.0953639-15.19804845 1.6430459.10778758-.1095364-.53893789-6.9007927-.9700882-10.62503002z" fill="${this.fill}" fill-rule="evenodd" transform="translate(8 10)"/>
      </svg>
    `;
  }
}

customElements.define('icon-images', IconImages);
