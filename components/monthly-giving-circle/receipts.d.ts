import { LitElement, PropertyValues } from 'lit';
import type { Receipt } from './models/receipt';
import '../elements/ia-button';
type ReceiptEmailStatus = {
    id: string;
    emailStatus: 'success' | 'fail' | 'pending' | '';
};
type receiptDispatcherMap = {
    [id: string]: ReceiptEmailStatus;
};
export declare class IauxMgcReceipts extends LitElement {
    receipts: never[];
    receiptDispatcher: receiptDispatcherMap | null;
    shouldUpdate(changed: PropertyValues): boolean;
    updated(changed: PropertyValues): void;
    updateReceiptSentMap(): void;
    emailReceipt(receipt: Receipt): void;
    /** callback that confirms status of an receipt email request  */
    emailSent(receiptEmailed: ReceiptEmailStatus): Promise<void>;
    emailStatusMessageToDisplay(receiptSentStatus: ReceiptEmailStatus): string;
    ctaButtonText(donation: Receipt, emailStatus?: ReceiptEmailStatus): "Sending..." | "Email receipt";
    protected render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
