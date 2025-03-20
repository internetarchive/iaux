import { html, fixture, expect } from "@open-wc/testing";
import "../src/user-menu";
import { buildTopNavMenus } from "../src/data/menus";

const component = html`<user-menu></user-menu>`;
const component2 = html`<user-menu screenName="brewster"></user-menu>`;

describe("<user-menu>", () => {
  it("does not render admin links for logged out users", async () => {
    const el = await fixture(component);
    el.menuItems = buildTopNavMenus().user;

    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll("li").length).to.be.gt(0);
    expect(el.shadowRoot.querySelectorAll(".divider").length).to.equal(0);
  });

  it("does not render admin links for logged in users", async () => {
    // NOTE: top-nav never renders admin links now -- that's been delegated to dynamic JS insertion
    // in petabox tree (since it's only relevant there).
    const el = await fixture(component2);
    el.menuItems = buildTopNavMenus("brewster_userid").user;

    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll("li").length).to.be.gt(0);
    expect(el.shadowRoot.querySelectorAll(".divider").length).to.equal(0);

    expect(el.shadowRoot.querySelectorAll("h3").length).to.equal(1);
    expect(el.shadowRoot.querySelector("h3").innerText).to.equal("brewster");
  });
});
