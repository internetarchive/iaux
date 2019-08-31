import { LitElement, html, css } from 'lit-element';

class MediaMenu extends LitElement {

  static get properties() {
    return {
      mediaMenuOpen: { type: Boolean },
      mediaMenuAnimate: { type: Boolean }
    };
  }

  render() {
    const mediaMenuClass = this.mediaMenuOpen ? 'media-menu open slide-in' : this.mediaMenuAnimate ? 'media-menu slide-out' : 'media-menu';
    const mediaMenuHidden = this.mediaMenuOpen ? 'false' : 'true';
    const mediaMenuExpanded = this.mediaMenuOpen ? 'true' : 'false';
    return html`
    <nav
      class="${mediaMenuClass}"
      aria-hidden="${mediaMenuHidden}"
      aria-expanded="${mediaMenuExpanded}"
    >
      <div class="grid">
        <a href="#"><div><img src="assets/img/ia-waybackmachine-999.svg"></div></a>
        <a href="#"><div>Wayback Machine</div></a>
        <a href="#"><div><img src="assets/img/ia-texts-999.svg"></div></a>
        <a href="#"><div>Texts</div></a>
        <a href="#"><div><img src="assets/img/ia-video-999.svg"></div></a>
        <a href="#"><div>Video</div></a>
        <a href="#"><div><img src="assets/img/ia-audio-999.svg"></div></a>
        <a href="#"><div>Audio</div></a>
        <a href="#"><div><img src="assets/img/ia-software-999.svg"></div></a>
        <a href="#"><div>Software</div></a>
        <a href="#"><div><img src="assets/img/ia-images-999.svg"></div></a>
        <a href="#"><div>Images</div></a>
        <a href="#"><div><img src="assets/img/ia-more-999.svg"></div></a>
        <a href="#"><div>More</div></a>
      </div>
    </nav>
    `;
  }

  static get styles() {
    return css`
      .media-menu {
        width: 100%;
        height: 500px;
        background-color: var(--black);
        color: var(--white);
        margin: 0px;
        font-size: 20px;
        font-family: "Helvetica Neue";
        transform: translate(0px, -1000px);
      }
      .open {
        transform: translate(0px, 0px);
        z-index: 1;
      }
      @keyframes slide-in {
        0% {
          transform: translate(0px, -1000px);
        }
        100% {
          transform: translate(0px, 0px);
        }
      }
      @keyframes slide-out {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(0px, -1000px);
        }
      }
      .slide-in {
        animation: slide-in 0.5s forwards;
      }
      .slide-out {
        animation: slide-out 0.5s forwards;
      }
      .grid {
        padding: 10px;
        display: grid;
        grid-template-columns: 50px 300px;
      }
      .grid div {
        height: 40px;
        padding: 10px;
      }
      a {
        display: inline;
        color: var(--white);
        text-decoration: none;
      }
     `;
  }
}

customElements.define('media-menu', MediaMenu);
