import { svg as w, LitElement as k, nothing as L, html as b, css as z } from "lit";
import { property as x, state as _, customElement as C } from "lit/decorators.js";
import { __awaiter as h } from "tslib";
const E = w`
  <svg
    class="icon-loader"
    height="20"
    viewBox="0 0 128 128"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <circle cx="16" cy="64" r="16" class="fill-color" fill-opacity="1" />
      <circle cx="16" cy="64" r="14.344" class="fill-color" fill-opacity="1" transform="rotate(45 64 64)" />
      <circle cx="16" cy="64" r="12.531" class="fill-color" fill-opacity="1" transform="rotate(90 64 64)" />
      <circle cx="16" cy="64" r="10.75" class="fill-color" fill-opacity="1" transform="rotate(135 64 64)" />
      <circle cx="16" cy="64" r="10.063" class="fill-color" fill-opacity="1" transform="rotate(180 64 64)" />
      <circle cx="16" cy="64" r="8.063" class="fill-color" fill-opacity="1" transform="rotate(225 64 64)" />
      <circle cx="16" cy="64" r="6.438" class="fill-color" fill-opacity="1" transform="rotate(270 64 64)" />
      <circle cx="16" cy="64" r="5.375" class="fill-color" fill-opacity="1" transform="rotate(315 64 64)" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
        calcMode="discrete"
        dur="720ms"
        repeatCount="indefinite"
      />
    </g>
  </svg>
`, I = w`
  <svg
    class="icon-question"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="fill-color" fill-rule="nonzero">
      <path
        d="m10.7078125 12.8359375v-.4140625c0-.765625.2890625-1.1484375 1.328125-1.75
           1.1015625-.6484375 1.671875-1.46875 1.671875-2.6484375
           0-1.78125-1.4765625-3.0234375-3.7109375-3.0234375
           -2.3984375 0-3.7578125 1.34375-3.796875 3.265625h2.1171875
           c.046875-.8828125.640625-1.453125 1.5390625-1.453125
           .890625 0 1.484375.5390625 1.484375 1.28125s-.3046875 1.125-1.3125 1.7265625
           c-1.078125.6328125-1.5078125 1.3359375-1.40625 2.5625l.015625.453125z"
      />
      <path
        d="m9.7 16.57c.711 0 1.281-.539 1.281-1.227s-.57-1.226-1.28-1.226
           c-.704 0-1.274.539-1.274 1.226s.57 1.227 1.274 1.227z"
      />
      <path
        d="m10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z
           m0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z"
      />
    </g>
  </svg>
`;
let N = () => ({
  events: {},
  emit(t, ...e) {
    (this.events[t] || []).forEach((r) => r(...e));
  },
  on(t, e) {
    return (this.events[t] = this.events[t] || []).push(e), () => this.events[t] = (this.events[t] || []).filter((r) => r !== e);
  }
});
function S(t) {
  return new Promise((e) => setTimeout(e, t));
}
var s;
(function(t) {
  t.retryNumber = "retryNumber", t.owner = "owner", t.dynamicImportLoaded = "dynamicImportLoaded", t.hasBeenRetried = "hasBeenRetried";
})(s || (s = {}));
const g = "lazyLoaderService";
class R {
  /**
   * LazyLoaderService constructor
   *
   * @param options LazyLoaderServiceOptions
   */
  constructor(e) {
    var r, o, i;
    this.emitter = N(), this.container = (r = e?.container) !== null && r !== void 0 ? r : document.head, this.retryCount = (o = e?.retryCount) !== null && o !== void 0 ? o : 2, this.retryInterval = (i = e?.retryInterval) !== null && i !== void 0 ? i : 1;
  }
  /** @inheritdoc */
  on(e, r) {
    return this.emitter.on(e, r);
  }
  /** @inheritdoc */
  loadBundle(e) {
    return h(this, void 0, void 0, function* () {
      let r, o;
      return e.module && (r = this.loadScript({
        src: e.module,
        bundleType: "module"
      })), e.nomodule && (o = this.loadScript({
        src: e.nomodule,
        bundleType: "nomodule"
      })), Promise.race([r, o]);
    });
  }
  /** @inheritdoc */
  loadScript(e) {
    return h(this, void 0, void 0, function* () {
      return this.doLoad(e);
    });
  }
  doLoad(e) {
    var r;
    return h(this, void 0, void 0, function* () {
      const o = (r = e.retryNumber) !== null && r !== void 0 ? r : 0, i = `script[src='${e.src}'][async][${s.owner}='${g}'][${s.retryNumber}='${o}']`;
      let n = this.container.querySelector(i);
      return n || (n = this.getScriptTag(Object.assign(Object.assign({}, e), { retryNumber: o })), this.container.appendChild(n)), new Promise((a, m) => {
        if (n.getAttribute(s.dynamicImportLoaded)) {
          a();
          return;
        }
        const c = e.scriptBeingRetried, p = n.onload || c?.onload;
        n.onload = (d) => {
          p?.(d), n.setAttribute(s.dynamicImportLoaded, "true"), a();
        };
        const v = n.onerror || c?.onerror;
        n.onerror = (d) => h(this, void 0, void 0, function* () {
          const f = n.getAttribute(s.hasBeenRetried);
          if (o < this.retryCount && !f) {
            n.setAttribute(s.hasBeenRetried, "true"), yield S(this.retryInterval * 1e3);
            const y = o + 1;
            this.emitter.emit("scriptLoadRetried", e.src, y), this.doLoad(Object.assign(Object.assign({}, e), { retryNumber: y, scriptBeingRetried: n }));
          } else
            f || this.emitter.emit("scriptLoadFailed", e.src, d), v?.(d), m(d);
        });
      });
    });
  }
  /**
   * Generate a script tag with all of the proper attributes
   *
   * @param options
   * @returns
   */
  getScriptTag(e) {
    var r;
    const o = e.src.replace("'", '"'), i = document.createElement("script"), n = e.retryNumber;
    i.setAttribute(s.owner, g), i.setAttribute("src", o), i.setAttribute(s.retryNumber, n.toString()), i.async = !0;
    const a = (r = e.attributes) !== null && r !== void 0 ? r : {};
    switch (Object.keys(a).forEach((m) => {
      i.setAttribute(m, a[m]);
    }), e.bundleType) {
      case "module":
        i.setAttribute("type", e.bundleType);
        break;
      // cannot be tested because modern browsers ignore `nomodule`
      /* istanbul ignore next */
      case "nomodule":
        i.setAttribute(e.bundleType, "");
        break;
    }
    return i;
  }
}
const B = "https://static.zdassets.com/ekr/snippet.js", P = new R();
function q(t) {
  return P.loadScript({
    src: `${B}?key=${t}`,
    attributes: { id: "ze-snippet" }
  });
}
function O(t = 1e4) {
  return new Promise((e, r) => {
    const o = setInterval(() => {
      window.zE && (clearInterval(o), clearTimeout(i), e());
    }, 100), i = setTimeout(() => {
      clearInterval(o), r(new Error("Zendesk API did not initialise in time"));
    }, t);
  });
}
var T = Object.defineProperty, A = Object.getOwnPropertyDescriptor, u = (t, e, r, o) => {
  for (var i = o > 1 ? void 0 : o ? A(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (i = (o ? a(e, r, i) : a(i)) || i);
  return o && i && T(e, r, i), i;
};
let l = class extends k {
  constructor() {
    super(...arguments), this.widgetKey = "6fe87bd8-d4e3-4b42-8632-be6eb933d54d", this.breakpoint = 767, this.isLoading = !1, this.isCompact = !1, this._onMqlChange = (t) => {
      this.isCompact = t.matches;
    }, this.zendeskReady = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._setupMediaQuery();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._mql?.removeEventListener("change", this._onMqlChange);
  }
  updated(t) {
    t.has("breakpoint") && (this._mql?.removeEventListener("change", this._onMqlChange), this._setupMediaQuery());
  }
  _setupMediaQuery() {
    this._mql = window.matchMedia(`(max-width: ${this.breakpoint}px)`), this.isCompact = this._mql.matches, this._mql.addEventListener("change", this._onMqlChange);
  }
  /**
   * Click handler for the Help button.
   *
   * On the first call: injects the Zendesk script and waits for `window.zE`
   * to become available, then opens the panel.
   *
   * On subsequent calls: the script is already present so we go straight to
   * opening the panel.
   */
  async initiateZenDesk() {
    this.isLoading = !0, this.dispatchEvent(new Event("zendeskHelpButtonClicked"));
    try {
      this.zendeskReady || (await q(this.widgetKey), await O(), this.zendeskReady = !0), window.zE?.("messenger", "open");
    } catch (t) {
      console.error("[ia-zendesk-widget]", t);
    } finally {
      this.isLoading = !1;
    }
  }
  get iconTemplate() {
    return this.isLoading ? E : I;
  }
  render() {
    return b`
      <button class="help-widget" @click=${this.initiateZenDesk}>
        ${this.iconTemplate}
        ${this.isCompact ? L : b`<span class="label">Help</span>`}
      </button>
    `;
  }
  static get styles() {
    return z`
      .help-widget {
        position: fixed;
        top: var(--button-top, auto);
        bottom: var(--button-bottom, 0);
        left: var(--button-left, auto);
        right: var(--button-right, 0);
        z-index: var(--button-z-index, 999998);
        width: var(--button-width, auto);
        padding: var(--button-padding, 14px 20px);
        margin: var(--button-margin, 14px 20px);
        background: var(--button-background, #194880);
        color: var(--button-color, #fff);
        border-radius: var(--button-border-radius, 999rem);
        border: 0;
        font-size: var(--button-font-size, 14px);
        font-weight: var(--button-font-weight, 700);
        letter-spacing: 0.6px;
        outline: none;
        cursor: pointer;
        vertical-align: middle;
        transition: opacity 0.12s linear;
      }

      .fill-color {
        fill: var(--button-color, #fff);
      }

      .help-widget svg {
        vertical-align: middle;
        pointer-events: none;
      }

      .label {
        pointer-events: none;
        margin-left: 5px;
      }
    `;
  }
};
u([
  x({ type: String })
], l.prototype, "widgetKey", 2);
u([
  x({ type: Number })
], l.prototype, "breakpoint", 2);
u([
  _()
], l.prototype, "isLoading", 2);
u([
  _()
], l.prototype, "isCompact", 2);
l = u([
  C("ia-zendesk-widget")
], l);
export {
  l as IAZendeskWidget
};
