import { LitElement, CSSResult } from 'lit';
export declare class MGCWelcome extends LitElement {
    patronName: string;
    baseHost: string;
    defaultMonthlyDonationAmount: number;
    protected render(): import("lit").TemplateResult<1>;
    get mailToInquiryLink(): string;
    static styles: CSSResult;
}
