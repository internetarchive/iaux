import { html, fixture, expect } from "@open-wc/testing";
import "../src/login-button";

const component = html`<login-button></login-button>`;

describe("<login-button>", () => {
  it("toggles active class when avatar clicked", async () => {
    const el = await fixture(component);

    el.shadowRoot.querySelector(".dropdown-toggle").click();
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(".active")).to.not.be.undefined;
  });
});
