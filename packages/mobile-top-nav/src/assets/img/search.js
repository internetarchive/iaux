import { html, css } from 'lit-element';
import Icon from './icon';

class Search extends Icon {
  constructor() {
    super();
    this.width = 40;
    this.height = 40;
  }

  static get properties() {
    return Object.assign({
      width: { type: Number },
      height: { type: Number },
    });
  }

  static get styles() {
    return css`
      svg {
        display: block;
      }
      path {
        fill: var(--baseColor);
      }
      .active path {
        fill: var(--activeSearchColor);
      }
    `;
  }

  render() {
    return html`
      <svg
        height="${this.height}"
        viewBox="0 0 40 40"
        width="${this.width}"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="searchTitleID searchDescID"
        class="${this.active ? 'active' : ''}"
      >
        <title id="searchTitleID">Search icon</title>
        <desc id="searchDescID">An illustration of a magnifying glass.</desc>
        <path d="m32.4526364 29.8875889-8.1719472-7.9751279c1.1046135-1.4876138 1.7652549-3.3102407 1.7652549-5.2846451 0-.101185-.0142895-.1981539-.030573-.2944743.0166158-.0976175.0309053-.196208.0309053-.2990145 0-4.9814145-4.152935-9.0343271-9.2572866-9.0343271-.0907218 0-.1781206.01394537-.2655193.02594487-.0880633-.0119995-.1747974-.02594487-.2655193-.02594487-5.1046839 0-9.25761889 4.0529126-9.25761889 9.0343271 0 .1011849.01395722.1981539.03057294.2947985-.01694804.0976176-.03090525.1958838-.03090525.2986903 0 4.9814145 4.1526027 9.0346514 9.2572866 9.0346514.0907218 0 .1777882-.0139454.2658516-.0262692.0873987.0123238.1741328.0262692.265187.0262692 1.7306942 0 3.3467399-.4747911 4.7338208-1.2852439l8.2882574 8.0886366c.3652137.3564177.843082.53414 1.3212826.53414.4782007 0 .9567336-.1780467 1.3212827-.53414.7294304-.7118622.7294304-1.8660845-.0003323-2.5782711zm-15.9526364-7.8875889c-.0832667-.0118703-.1652765-.0253024-.2513711-.0253024-2.8781993 0-5.2197212-2.3278242-5.2197212-5.1891862 0-.0974612-.013197-.1908615-.0289077-.2836371.0160249-.0940251.0292219-.1889874.0292219-.2880105 0-2.861362 2.3418361-5.1891861 5.2200354-5.1891861.0854662 0 .1677902-.0131198.2510569-.0246777.0826383.0115579.1649623.0246777.2510569.0246777 2.8781993 0 5.2197212 2.3278241 5.2197212 5.1891861 0 .0974612.0135112.1908616.0289077.2839496-.0157107.0940251-.0295361.1886749-.0295361.287698 0 2.861362-2.3415219 5.1891862-5.2197212 5.1891862-.0860946 0-.1684187.0134321-.2507427.0253024z" fill-rule="evenodd" />
      </svg>
    `;
  }
}

customElements.define('search-image', Search);
