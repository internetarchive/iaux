import { LitElement } from 'lit';
import type { MonthlyPlan } from './models/plan';
import './form-sections/cancel';
export declare class IauxEditPlanForm extends LitElement {
    plan?: MonthlyPlan;
    cancelPlanHandler?: (plan: MonthlyPlan) => void;
    render(): import("lit").TemplateResult<1>;
}
