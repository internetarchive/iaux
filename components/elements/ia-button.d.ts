import { LitElement } from 'lit';
export declare class IauxButton extends LitElement {
    isDisabled: boolean;
    clickHandler?: (e: Event, self: IauxButton) => void;
    button: HTMLButtonElement;
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
