import {
  LitElement,
  html,
  css,
  customElement,
  property,
  CSSResult,
  TemplateResult,
} from 'lit-element';

@customElement('quick-search')
export default class QuickSearch extends LitElement {
  @property({ type: Array }) quickSearches: string[] = [];

  render(): TemplateResult {
    return html`
      <ul>
        ${this.quickSearches.map(
          (quickSearch: string) => html`
            <li>
              <a @click=${this.doQuickSearch} data-search-term=${quickSearch}>${quickSearch}</a>
            </li>
          `,
        )}
      </ul>
    `;
  }

  private doQuickSearch(e: Event): void {
    const { searchTerm } = (e.target as HTMLElement).dataset;
    if (searchTerm) {
      const event = new CustomEvent('searchTermSelected', {
        detail: { searchTerm },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  static get styles(): CSSResult {
    return css`
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
      }

      ul li {
        padding: 0.25em 0 0 0;
        margin: 0;
        display: block;
      }

      ul li a {
        color: rgb(68, 132, 202);
        text-decoration: none;
        cursor: pointer;
      }
    `;
  }
}
