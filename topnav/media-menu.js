import { LitElement, html, css } from 'lit-element';

class MediaMenu extends LitElement {

  static get properties() {
    return {
    };
  }

  render() {
    return html`
    <nav class="media-menu">
      <div class="media-menu">
        <a href="#"><div><img src="assets/img/ia-waybackmachine-999.svg"></div></a>
        <a href="#"><div>Wayback Machine</div></a>
        <div><img src="assets/img/ia-texts-999.svg"></div>
        <div>Texts</div>
        <div><img src="assets/img/ia-video-999.svg"></div>
        <div>Video</div>
        <div><img src="assets/img/ia-audio-999.svg"></div>
        <div>Audio</div>
        <div><img src="assets/img/ia-software-999.svg"></div>
        <div>Software</div>
        <div><img src="assets/img/ia-images-999.svg"></div>
        <div>Images</div>
        <div><img src="assets/img/ia-more-999.svg"></div>
        <div>More</div>
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
        display: grid;
        grid-template-columns: 50px 300px;
        font-family: "Helvetica Neue";
      }
      .media-menu div {
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
