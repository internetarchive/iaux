import { html, fixture, expect, oneEvent } from "@open-wc/testing";
import sinon from "sinon";
import "../src/ia-wayback-search";
const component = (properties = {
    waybackPagesArchived: "32 trillion pages",
}) => html `
  <ia-wayback-search
    waybackPagesArchived=${properties.waybackPagesArchived}
  ></ia-wayback-search>
`;
describe("<wayback-search>", () => {
    it("redirects on submit", async () => {
        var _a;
        const query = "archive.org";
        const submitEvent = {
            target: null,
            type: "submit",
            preventDefault: () => { },
        };
        const performQuery = sinon.fake();
        const el = await fixture(component());
        el.queryHandler = { performQuery };
        submitEvent.target = (_a = el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("form");
        // el.shadowRoot?.getElementById('url')?.value = query;
        // el.handleSubmit(submitEvent);
        // expect(performQuery.callCount).to.equal(1);
        // expect(performQuery.firstArg).to.contain(query);
    });
    it("renders the Wayback pages count", async () => {
        var _a;
        const config = { waybackPagesArchived: "42" };
        const el = await fixture(component(config));
        const p = (_a = el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("p");
        expect(p === null || p === void 0 ? void 0 : p.innerText).to.contain(config.waybackPagesArchived);
    });
    it("emits an event when Wayback logo clicked", async () => {
        const el = await fixture(component());
        setTimeout(() => el.emitWaybackMachineLogoLinkClicked());
        const response = await oneEvent(el, "waybackMachineLogoLink");
        expect(response).to.exist;
    });
    it("emits an event when machine stats link clicked", async () => {
        const el = await fixture(component());
        setTimeout(() => el.emitWaybackMachineStatsLinkClicked());
        const response = await oneEvent(el, "waybackMachineStatsLinkClicked");
        expect(response).to.exist;
    });
    it("emits an event when form submitted", async () => {
        const el = await fixture(component());
        setTimeout(() => el.emitWaybackSearchSubmitted("boop"));
        const response = await oneEvent(el, "waybackSearchSubmitted");
        expect(response).to.exist;
    });
});
//# sourceMappingURL=wayback-search.test.js.map