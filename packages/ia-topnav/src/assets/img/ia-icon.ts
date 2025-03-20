import { LitElement, TemplateResult, html } from "lit";
import "./icons";
import { property } from "lit/decorators.js";

class IAIcon extends LitElement {
  @property({ type: String }) icon = "";

  static get icons(): Record<string, TemplateResult> {
    return {
      audio: html`<icon-audio></icon-audio>`,
      ellipses: html`<icon-ellipses></icon-ellipses>`,
      images: html`<icon-images></icon-images>`,
      software: html`<icon-software></icon-software>`,
      texts: html`<icon-texts></icon-texts>`,
      video: html`<icon-video></icon-video>`,
      web: html`<icon-web></icon-web>`,
    };
  }

  render() {
    return IAIcon.icons[this.icon];
  }
}

customElements.define("ia-icon", IAIcon);
