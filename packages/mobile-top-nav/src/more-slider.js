import { LitElement, html } from 'lit-element';
import moreCss from './css/more-slider';

class MoreSlider extends LitElement {
  static get styles() {
    return moreCss();
  }

  get menuItems() {
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

  render() {
    return html`
      <ul>
        ${this.menuItems.map((item) => html`<li><a href="${item.url}">${item.label}</a></li>`)}
      </ul>
    `;
  }
}

customElements.define('more-slider', MoreSlider);
