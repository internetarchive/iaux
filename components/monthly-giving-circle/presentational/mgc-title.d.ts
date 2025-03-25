import { LitElement, TemplateResult, nothing } from 'lit';
import '@internetarchive/icon-donate/icon-donate.js';
export declare class MonthlyGivingCircle extends LitElement {
    titleStyle: 'heart' | 'default';
    get heart(): TemplateResult | typeof nothing;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
