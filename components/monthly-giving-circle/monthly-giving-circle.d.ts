import { LitElement, TemplateResult, PropertyValues } from 'lit';
import './welcome-message';
import './plans';
import './presentational/mgc-title';
import './receipts';
import type { IauxMgcReceipts } from './receipts';
import '../elements/ia-button';
import type { MonthlyPlan } from './models/plan';
export type APlanUpdate = {
    plan?: MonthlyPlan;
    donationId?: string;
    status: 'success' | 'fail';
    action: 'receiptSent' | 'cancel';
    message: string;
};
export declare class MonthlyGivingCircle extends LitElement {
    patronName: string;
    receipts: never[];
    updates: APlanUpdate[];
    plans: never[];
    editingThisPlan?: MonthlyPlan;
    viewToDisplay: 'welcome' | 'receipts' | 'plans';
    protected createRenderRoot(): this;
    updated(changed: PropertyValues): void;
    protected render(): TemplateResult<1>;
    get receiptListElement(): IauxMgcReceipts;
    updateReceived(update: APlanUpdate): void;
    get currentView(): TemplateResult;
    get receiptsView(): TemplateResult;
    get plansView(): TemplateResult;
    get sectionTitle(): TemplateResult;
}
