import { LitElement } from "lit";
export declare class WaybackSearch extends LitElement {
    queryHandler: {
        performQuery: (query: string) => void;
    };
    waybackPagesArchived: string;
    private urlInput;
    render(): import("lit").TemplateResult<1>;
    private handleSubmit;
    emitWaybackSearchSubmitted(query: string): void;
    emitWaybackMachineStatsLinkClicked(): void;
    emitWaybackMachineLogoLinkClicked(): void;
    static styles: import("lit").CSSResult;
}
