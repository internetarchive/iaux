import { html, fixture, expect, oneEvent } from "@open-wc/testing";
import sinon from "sinon";
import "../src/ia-wayback-search";
import type { WaybackSearch } from "../src/ia-wayback-search";
import { TemplateResult } from "lit-html";

const component = (
  properties: {
    waybackPagesArchived: string;
  } = {
    waybackPagesArchived: "32 trillion pages",
  },
): TemplateResult => html`
  <ia-wayback-search
    waybackPagesArchived=${properties.waybackPagesArchived}
  ></ia-wayback-search>
`;

describe("<wayback-search>", () => {
  it("redirects on submit", async () => {
    const query = "archive.org";
    const submitEvent = new Event("submit");
    const performQuery = sinon.fake();
    const el = await fixture<WaybackSearch>(component());
    el.queryHandler = { performQuery };
    const input = el.shadowRoot?.getElementById("url") as HTMLInputElement;
    if (input) {
      input.value = query;
    }
    el.handleSubmit(submitEvent);
    expect(performQuery.callCount).to.equal(1);
    expect(performQuery.args[0]).to.contain(query);
  });

  it("renders the Wayback pages count", async () => {
    const config = { waybackPagesArchived: "42" };
    const el = await fixture(component(config));
    const p = el.shadowRoot?.querySelector("p");

    expect(p?.innerText).to.contain(config.waybackPagesArchived);
  });

  it("emits an event when Wayback logo clicked", async () => {
    const el = await fixture<WaybackSearch>(component());

    setTimeout(() => el.emitWaybackMachineLogoLinkClicked());
    const response = await oneEvent(el, "waybackMachineLogoLink");

    expect(response).to.exist;
  });

  it("emits an event when machine stats link clicked", async () => {
    const el = await fixture<WaybackSearch>(component());

    setTimeout(() => el.emitWaybackMachineStatsLinkClicked());
    const response = await oneEvent(el, "waybackMachineStatsLinkClicked");

    expect(response).to.exist;
  });

  it("emits an event when form submitted", async () => {
    const el = await fixture<WaybackSearch>(component());

    setTimeout(() => el.emitWaybackSearchSubmitted("boop"));
    const response = await oneEvent(el, "waybackSearchSubmitted");

    expect(response).to.exist;
  });
});
