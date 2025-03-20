import { LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class Icon extends LitElement {
  @property({ type: Boolean }) active = false;

  @property({ type: String }) fill = "fff";
}
