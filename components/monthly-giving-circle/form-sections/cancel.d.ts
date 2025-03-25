import { LitElement, TemplateResult, PropertyValues, nothing } from 'lit';
import type { MonthlyPlan } from '../models/plan';
import '@internetarchive/donation-form/dist/src/form-elements/contact-form/contact-form.js';
import '@internetarchive/donation-form-section';
export declare class IauxMgcCancelPlan extends LitElement {
    plan?: MonthlyPlan;
    patronWantsToKeepPlan: boolean;
    initialCancelRequest: boolean;
    form: HTMLFormElement;
    updated(changed: PropertyValues): void;
    cancelThisPlan(e: Event): Promise<void>;
    get formId(): string;
    protected render(): typeof nothing | TemplateResult;
    get confirmCancelation(): TemplateResult | typeof nothing;
    static styles: import("lit").CSSResult;
}
