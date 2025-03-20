import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../src/ia-wayback-search";

@customElement("app-root")
export class AppRoot extends LitElement {
  render() {
    return html` <ia-wayback-search></ia-wayback-search> `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
