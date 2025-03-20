import { __decorate } from "tslib";
import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../src/ia-wayback-search";
let AppRoot = class AppRoot extends LitElement {
    render() {
        return html `
      <ia-wayback-search
        .queryHandler=${{
            performQuery: (query) => (window.location.href = `https://web.archive.org/web/*/${query}`),
        }}
        @waybackSearchSubmitted=${(e) => console.log(`waybackSearchSubmitted: ${e.detail.query}`)}
        @waybackMachineStatsLinkClicked=${() => console.log("waybackMachineStatsLinkClicked event")}
        @waybackMachineLogoLink=${() => console.log("waybackMachineLogoLink event")}
      >
      </ia-wayback-search>
    `;
    }
};
AppRoot.styles = css `
    :host {
      display: block;
    }
  `;
AppRoot = __decorate([
    customElement("app-root")
], AppRoot);
export { AppRoot };
//# sourceMappingURL=app-root.js.map