import { LitElement, PropertyValues, TemplateResult, CSSResult } from 'lit';
import ZoneOfSilence from './models/zone-of-silence';
export default class WaveformProgress extends LitElement {
    percentComplete: number;
    waveformUrl: string;
    interactive: boolean;
    zonesOfSilence: ZoneOfSilence[];
    private _percentComplete;
    private _userIsInteracting;
    render(): TemplateResult;
    private get zonesOfSilenceTemplate();
    private get interactionCoverTemplate();
    updated(changedProperties: PropertyValues): void;
    private drag;
    private dragstart;
    private dragend;
    private updatePercentComplete;
    private dispatchValueChangeEvent;
    private get dragcover();
    private get container();
    private offsetXToPercent;
    static get styles(): CSSResult;
}
