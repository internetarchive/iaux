import { LitElement, html, css } from 'lit-element';

class MoreSlider extends LitElement {
  static get menuItems() {
    return [
      { label: 'Donate', url: '/donate/' },
      { label: 'About', url: '/about/' },
      { label: 'Contact', url: '/about/contact.php' },
      { label: 'Blog', url: 'https://blog.archive.org/' },
      { label: 'Projects', url: '/projects/' },
      { label: 'Help', url: '/about/faqs.php' },
      { label: 'Jobs', url: '/about/jobs.php' },
      { label: 'Volunteer', url: '/about/volunteerpositions.php' },
      { label: 'People', url: '/about/bios.php' },
    ];
  }

  static get styles() {
    return css`
      ul {
        padding: 1rem 0;
        margin: 0;
        list-style: none;
      }
      a {
        display: block;
        padding: 1rem 0;
        text-decoration: none;
        color: var(--activeColor);
      }
    `;
  }

  render() {
    return html`
      <ul>
        ${MoreSlider.menuItems.map(
          item =>
            html`
              <li><a href="${item.url}">${item.label}</a></li>
            `,
        )}
      </ul>
    `;
  }
}

customElements.define('more-slider', MoreSlider);
