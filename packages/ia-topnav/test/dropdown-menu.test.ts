import { html, fixture, expect } from "@open-wc/testing";

import DropdownMenu from "../src/dropdown-menu";

customElements.define("dropdown-menu", DropdownMenu);

const component = html`<dropdown-menu></dropdown-menu>`;

describe("<dropdown-menu>", () => {
  it("sets default properties", async () => {
    const el = await fixture(component);

    expect(el.animate).to.be.false;
    expect(el.open).to.be.false;
    expect(el.menuItems.length).to.equal(0);
  });

  it("renders a closed class if component is animating", async () => {
    const el = await fixture(component);

    el.animate = true;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".closed")).to.not.be.undefined;
  });
});
