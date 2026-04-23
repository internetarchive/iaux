(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();function h(n,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,t,i);else for(var d=n.length-1;d>=0;d--)(s=n[d])&&(r=(o<3?s(r):o>3?s(e,t,r):s(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=window,ie=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),re=new WeakMap;let ye=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ie&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=re.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&re.set(t,e))}return e}toString(){return this.cssText}};const Ee=n=>new ye(typeof n=="string"?n:n+"",void 0,oe),f=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,o,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[r+1],n[0]);return new ye(t,n,oe)},xe=(n,e)=>{ie?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=H.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,n.appendChild(i)})},se=ie?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Ee(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var j;const z=window,ne=z.trustedTypes,ke=ne?ne.emptyScript:"",le=z.reactiveElementPolyfillSupport,ee={toAttribute(n,e){switch(e){case Boolean:n=n?ke:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},$e=(n,e)=>e!==n&&(e==e||n==n),G={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:$e};let S=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=G){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||G}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(se(o))}else e!==void 0&&t.push(se(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return xe(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=G){var o;const r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){const s=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:ee).toAttribute(t,i.type);this._$El=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,r=o._$Ev.get(e);if(r!==void 0&&this._$El!==r){const s=o.getPropertyOptions(r),d=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?s.converter:ee;this._$El=r,this[r]=d.fromAttribute(t,s.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||$e)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,r)=>this[r]=o),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};S.finalized=!0,S.elementProperties=new Map,S.elementStyles=[],S.shadowRootOptions={mode:"open"},le==null||le({ReactiveElement:S}),((j=z.reactiveElementVersions)!==null&&j!==void 0?j:z.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var q;const O=window,k=O.trustedTypes,ae=k?k.createPolicy("lit-html",{createHTML:n=>n}):void 0,te="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,be="?"+$,Ce=`<${be}>`,A=document,T=()=>A.createComment(""),P=n=>n===null||typeof n!="object"&&typeof n!="function",_e=Array.isArray,Le=n=>_e(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",W=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,ce=/>/g,_=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),he=/'/g,pe=/"/g,we=/^(?:script|style|textarea|title)$/i,Ae=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),E=Ae(1),Ie=Ae(2),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ue=new WeakMap,w=A.createTreeWalker(A,129,null,!1),Te=(n,e)=>{const t=n.length-1,i=[];let o,r=e===2?"<svg>":"",s=I;for(let l=0;l<t;l++){const a=n[l];let y,c,v=-1,g=0;for(;g<a.length&&(s.lastIndex=g,c=s.exec(a),c!==null);)g=s.lastIndex,s===I?c[1]==="!--"?s=de:c[1]!==void 0?s=ce:c[2]!==void 0?(we.test(c[2])&&(o=RegExp("</"+c[2],"g")),s=_):c[3]!==void 0&&(s=_):s===_?c[0]===">"?(s=o??I,v=-1):c[1]===void 0?v=-2:(v=s.lastIndex-c[2].length,y=c[1],s=c[3]===void 0?_:c[3]==='"'?pe:he):s===pe||s===he?s=_:s===de||s===ce?s=I:(s=_,o=void 0);const B=s===_&&n[l+1].startsWith("/>")?" ":"";r+=s===I?a+Ce:v>=0?(i.push(y),a.slice(0,v)+te+a.slice(v)+$+B):a+$+(v===-2?(i.push(void 0),l):B)}const d=r+(n[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ae!==void 0?ae.createHTML(d):d,i]};class R{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,s=0;const d=e.length-1,l=this.parts,[a,y]=Te(e,t);if(this.el=R.createElement(a,i),w.currentNode=this.el.content,t===2){const c=this.el.content,v=c.firstChild;v.remove(),c.append(...v.childNodes)}for(;(o=w.nextNode())!==null&&l.length<d;){if(o.nodeType===1){if(o.hasAttributes()){const c=[];for(const v of o.getAttributeNames())if(v.endsWith(te)||v.startsWith($)){const g=y[s++];if(c.push(v),g!==void 0){const B=o.getAttribute(g.toLowerCase()+te).split($),U=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:U[2],strings:B,ctor:U[1]==="."?Re:U[1]==="?"?Be:U[1]==="@"?Ue:D})}else l.push({type:6,index:r})}for(const v of c)o.removeAttribute(v)}if(we.test(o.tagName)){const c=o.textContent.split($),v=c.length-1;if(v>0){o.textContent=k?k.emptyScript:"";for(let g=0;g<v;g++)o.append(c[g],T()),w.nextNode(),l.push({type:2,index:++r});o.append(c[v],T())}}}else if(o.nodeType===8)if(o.data===be)l.push({type:2,index:r});else{let c=-1;for(;(c=o.data.indexOf($,c+1))!==-1;)l.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(e,t){const i=A.createElement("template");return i.innerHTML=e,i}}function L(n,e,t=n,i){var o,r,s,d;if(e===C)return e;let l=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const a=P(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((r=l==null?void 0:l._$AO)===null||r===void 0||r.call(l,!1),a===void 0?l=void 0:(l=new a(n),l._$AT(n,t,i)),i!==void 0?((s=(d=t)._$Co)!==null&&s!==void 0?s:d._$Co=[])[i]=l:t._$Cl=l),l!==void 0&&(e=L(n,l._$AS(n,e.values),l,i)),e}class Pe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:A).importNode(i,!0);w.currentNode=r;let s=w.nextNode(),d=0,l=0,a=o[0];for(;a!==void 0;){if(d===a.index){let y;a.type===2?y=new M(s,s.nextSibling,this,e):a.type===1?y=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(y=new He(s,this,e)),this._$AV.push(y),a=o[++l]}d!==(a==null?void 0:a.index)&&(s=w.nextNode(),d++)}return w.currentNode=A,r}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class M{constructor(e,t,i,o){var r;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(r=o==null?void 0:o.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=L(this,e,t),P(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Le(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==p&&P(this._$AH)?this._$AA.nextSibling.data=e:this.$(A.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=R.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(i);else{const s=new Pe(r,this),d=s.u(this.options);s.v(i),this.$(d),this._$AH=s}}_$AC(e){let t=ue.get(e.strings);return t===void 0&&ue.set(e.strings,t=new R(e)),t}T(e){_e(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new M(this.k(T()),this.k(T()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class D{constructor(e,t,i,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let s=!1;if(r===void 0)e=L(this,e,t,0),s=!P(e)||e!==this._$AH&&e!==C,s&&(this._$AH=e);else{const d=e;let l,a;for(e=r[0],l=0;l<r.length-1;l++)a=L(this,d[i+l],t,l),a===C&&(a=this._$AH[l]),s||(s=!P(a)||a!==this._$AH[l]),a===p?e=p:e!==p&&(e+=(a??"")+r[l+1]),this._$AH[l]=a}s&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Re extends D{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}}const Me=k?k.emptyScript:"";class Be extends D{constructor(){super(...arguments),this.type=4}j(e){e&&e!==p?this.element.setAttribute(this.name,Me):this.element.removeAttribute(this.name)}}class Ue extends D{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=L(this,e,t,0))!==null&&i!==void 0?i:p)===C)return;const o=this._$AH,r=e===p&&o!==p||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==p&&(o===p||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class He{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}}const ve=O.litHtmlPolyfillSupport;ve==null||ve(R,M),((q=O.litHtmlVersions)!==null&&q!==void 0?q:O.litHtmlVersions=[]).push("2.7.4");const Fe=(n,e,t)=>{var i,o;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let s=r._$litPart$;if(s===void 0){const d=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;r._$litPart$=s=new M(e.insertBefore(T(),d),d,void 0,t??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var K,Z;class x extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Fe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return C}}x.finalized=!0,x._$litElement$=!0,(K=globalThis.litElementHydrateSupport)===null||K===void 0||K.call(globalThis,{LitElement:x});const fe=globalThis.litElementPolyfillSupport;fe==null||fe({LitElement:x});((Z=globalThis.litElementVersions)!==null&&Z!==void 0?Z:globalThis.litElementVersions=[]).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Se=n=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(n,e):((t,i)=>{const{kind:o,elements:r}=i;return{kind:o,elements:r,finisher(s){customElements.define(t,s)}}})(n,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}};function b(n){return(e,t)=>t!==void 0?((i,o,r)=>{o.constructor.createProperty(r,i)})(n,e,t):ze(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function V(n){return b({...n,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oe=({finisher:n,descriptor:e})=>(t,i)=>{var o;if(i===void 0){const r=(o=t.originalKey)!==null&&o!==void 0?o:t.key,s=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return n!=null&&(s.finisher=function(d){n(d,r)}),s}{const r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),n==null||n(r,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(n,e){return Oe({descriptor:t=>{const i={get(){var o,r;return(r=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(n))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const o=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,s;return this[o]===void 0&&(this[o]=(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(n))!==null&&s!==void 0?s:null),this[o]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var J;((J=window.HTMLSlotElement)===null||J===void 0?void 0:J.prototype.assignedElements)!=null;const F=location.hostname==="localhost"||location.hostname==="local.archive.org"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)?console.log.bind(console):()=>{};async function ge(n){var e;const t={action:null,identifier:"",file:null,getParam:"",endpoint:"",headers:{},callback(){},...n};let i={},o="";const r=window==null?void 0:window.location;(r==null?void 0:r.pathname)==="/demo/"?o="/demo/":o=`${t.endpoint}?${t.getParam}`;try{await fetch(o,{method:"POST",headers:t.headers,body:(e=t.file)!==null&&e!==void 0?e:null}).then(s=>{if(F("response",s),o==="/demo/"&&t.action==="verify-upload")return{success:!0,item_last_updated:1};if(t.action==="save-file"&&s.status===200)return t.callback(s),{};if(s.status!==0)return s.json()}).then(s=>{t.action==="save-file"&&F("file saved, metadata call started to verify is picture is updated!"),i=s})}catch(s){F(s)}return i}const me=f`var(--white, #fff)`,Ne=f`var(--primaryDisableCTAFill, #767676)`,De=f`var(--secondaryCTABorder, #999)`,Ve=f`var(--primaryCTAFill, #194880)`,Q=f`var(--primaryCTAFillRGB, 25, 72, 128)`,je=f`var(--primaryCTABorder, #c5d1df)`,Ge=f`var(--primaryErrorCTAFill, #d9534f)`,X=f`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,qe=f`var(--primaryErrorCTABorder, #d43f3a)`,We=f`var(--secondaryCTAFill, #333)`,Y=f`var(--secondaryCTAFillRGB, 51, 51, 51)`,Ke=f`var(--primaryCTABorder, #979797)`,Ze=f`#ee8950`,Je=f`#ec7939`,Qe=f`
  .ia-button {
    height: 3.5rem;
    min-height: 3rem;
    cursor: pointer;
    color: ${me};
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 3rem;
    outline-color: ${me};
    outline-offset: -4px;
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    background-color: ${Ne};
    border: 1px solid ${De};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${Ze}
    border-color: ${Je};
  }

  .ia-button.primary {
    background-color: ${Ve};
    border-color: ${je};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Q}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Q}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Q}, 0.7);
  }

  .ia-button.danger {
    background-color: ${Ge};
    border-color: ${qe};
  }
  .ia-button.danger:hover {
    background-color: rgba(${X}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${X}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${X}, 0.7);
  }

  .ia-button.dark {
    background-color: ${We};
    border-color: ${Ke};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Y}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Y}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Y}, 0.7);
  }
`;let u=class extends x{constructor(){super(...arguments),this.identifier="",this.endpoint="/services/post-file.php",this.picture="",this.type="compact",this.lookingAtMyAccount=!1,this.maxFileSizeInMB=8,this.validFileTypes=["image/jpeg","image/png","image/gif"],this.showLoadingIndicator=!1,this.taskStatus="",this.fileValidationError="",this.showDropper=!1,this.fileTypeMessage="Image file must be a JPEG, PNG, or GIF.",this.fileSizeMessage="",this.relatedTarget=null}firstUpdated(){this.fileSizeMessage=`Image file must be less than ${this.maxFileSizeInMB}MB.`,this.renderInput(),this.lookingAtMyAccount&&this.bindEvents()}renderInput(){var e,t,i;const o=document.createElement("input");o.type="file",o.accept="image/*",o.multiple=!1,(e=this.profileSection)===null||e===void 0||e.addEventListener("mouseenter",()=>{var r;(r=this.profileSection)===null||r===void 0||r.classList.add("profile-hover")}),(t=this.dropRegion)===null||t===void 0||t.addEventListener("click",()=>{o.click()}),(i=this.uploadRegion)===null||i===void 0||i.addEventListener("click",()=>{o.click()}),o.addEventListener("change",()=>{const{files:r}=o;this.handleSelectedFiles(r)})}dragOver(e){var t,i,o;this.preventDefault(e),(t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("hidden"),this.showLoadingIndicator||(i=this.selfSubmitEle)===null||i===void 0||i.classList.add("drag-over"),(o=this.overlay)===null||o===void 0||o.classList.add("window-drag-over")}dragLeave(e){var t,i,o;this.preventDefault(e),this.relatedTarget===e.target&&(this.showLoadingIndicator||((t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("drag-over"),(i=this.selfSubmitEle)===null||i===void 0||i.classList.add("hidden")),(o=this.overlay)===null||o===void 0||o.classList.remove("window-drag-over"))}drop(e){var t,i;this.preventDefault(e),(t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("drag-over"),(i=this.overlay)===null||i===void 0||i.classList.remove("window-drag-over"),this.showLoadingIndicator||this.cancelFile()}bindEvents(){var e,t;document.addEventListener("dragenter",i=>{this.relatedTarget=i.target},!1),document.addEventListener("dragover",i=>this.dragOver(i),!1),document.addEventListener("dragleave",i=>this.dragLeave(i),!0),document.addEventListener("drop",i=>this.drop(i),!1),document==null||document.addEventListener("saveProfileAvatar",i=>{var o;!((o=this.fileSelector)===null||o===void 0)&&o.files.length&&this.handleSaveFile(i)}),[this.overlay,this.dropRegion,this.selfSubmitEle].forEach(i=>i==null?void 0:i.addEventListener("drop",this.handleDropImage.bind(this),!1)),(e=this.saveFile)===null||e===void 0||e.addEventListener("submit",this.handleSaveFile.bind(this),!1),(t=this.fileSelector)===null||t===void 0||t.addEventListener("change",()=>{const{files:i}=this.fileSelector;this.handleSelectedFiles(i)})}preventDefault(e){e.preventDefault(),e.stopPropagation()}handleDropImage(e){var t,i;if(this.preventDefault(e),(t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("drag-over"),!this.showLoadingIndicator){const o=(i=e==null?void 0:e.dataTransfer)===null||i===void 0?void 0:i.files;o!=null&&o.length&&this.handleSelectedFiles(o)}}previewImage(e){var t,i;this.showDropper=!0;let o;this.type==="full"?o=document.createElement("img"):o=(t=this.dropRegion)===null||t===void 0?void 0:t.querySelector("img"),o.alt="profile picture";const r=new FileReader;if(r.onload=s=>{var d;o.src=(d=s.target)===null||d===void 0?void 0:d.result},this.type==="full"){const s=(i=this.selfSubmitEle)===null||i===void 0?void 0:i.querySelector(".full-preview");s==null||s.appendChild(o)}r.readAsDataURL(e)}validateImage(e){this.fileValidationError="";const t=this.validFileTypes,i=this.maxFileSizeInMB*1024*1024;return t.indexOf(e.type)===-1?(this.fileValidationError=this.fileTypeMessage,!1):e.size>i?(this.fileValidationError=this.fileSizeMessage,!1):!0}async handleSelectedFiles(e){var t,i,o,r;const s=(t=this.selfSubmitEle)===null||t===void 0?void 0:t.querySelector(".image-preview");if((i=this.overlay)===null||i===void 0||i.classList.remove("window-drag-over"),this.type==="full"&&((o=this.selfSubmitEle)===null||o===void 0||o.classList.remove("hidden")),e.length&&this.validateImage(e[0])){if(this.type==="full")for(;s!=null&&s.firstChild&&s.removeChild(s.firstChild););await this.previewImage(e[0]),this.fileSelector&&(this.fileSelector.files=e)}else for(e.length||this.cancelFile();s!=null&&s.firstChild&&s.removeChild(s.firstChild););this.dispatchEvent(new CustomEvent("fileChanged",{detail:{error:(r=this.fileValidationError)!==null&&r!==void 0?r:""}}))}async handleSaveFile(e){var t,i;this.preventDefault(e),this.showLoadingIndicator=!0,(t=this.selfSubmitEle)===null||t===void 0||t.classList.add("vertical-center"),this.taskStatus="waiting for your tasks to queue";const o=(i=this.fileSelector)===null||i===void 0?void 0:i.files[0],r=`identifier=${this.identifier}&fname=${encodeURIComponent(o.name)}&submit=1`;await ge({action:"save-file",identifier:this.identifier,file:o,getParam:r,endpoint:this.endpoint,headers:{"Content-type":"multipart/form-data; charset=UTF-8"},callback:async()=>{F("callback invoked!",this.type),this.type==="full"&&await this.metadataAPIExecution()}}),this.dispatchEvent(new Event("fileUploaded")),this.type==="compact"&&(this.showLoadingIndicator=!1),this.fileSelector&&(this.fileSelector.value="")}metadataAPIExecution(){const e=Math.round(Date.now()/1e3),t=setInterval(async()=>{ge({action:"verify-upload",endpoint:`https://archive.org/metadata/${this.identifier}?rand=${Math.random()}`}).then(o=>{const r=o.pending_tasks&&o.tasks?o.tasks.length:0;r?o.tasks.filter(d=>d.wait_admin===2).length?(this.taskStatus="status task failure -- an admin will need to resolve",clearInterval(t)):this.taskStatus=`waiting for your ${r} tasks to finish`:o.item_last_updated<e?this.taskStatus="waiting for your tasks to queue":(clearInterval(t),this.taskStatus="reloading page with your image",window.location.reload())})},2e3)}cancelFile(){var e,t,i;const o=(e=this.selfSubmitEle)===null||e===void 0?void 0:e.querySelector(".image-preview");for(this.fileSelector&&(this.fileSelector.value=""),this.showDropper=!1,this.showLoadingIndicator=!1,this.fileValidationError="",(t=this.selfSubmitEle)===null||t===void 0||t.classList.add("hidden"),(i=this.profileSection)===null||i===void 0||i.classList.remove("profile-hover");o!=null&&o.firstChild&&o.removeChild(o.firstChild););}get loadingIndicatorTemplate(){return E` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`}get selfSubmitFormTemplate(){const e=encodeURIComponent(`${this.endpoint}?identifier=${this.identifier}&submit=1`);return E`
      <div class="self-submit-form hidden">
        <button
          class="close-button
          ${!this.showDropper&&this.fileValidationError===""||this.showLoadingIndicator?"hidden":""}
          ${this.showLoadingIndicator?"pointer-none":""}"
          @click=${()=>{this.cancelFile()}}
        >
          &#10060;
        </button>
        ${this.showLoadingIndicator?this.loadingIndicatorTemplate:this.plusSVGTemplate(35,35,"#969696","#fff")}
        <span
          class="drag-text ${this.showLoadingIndicator?"pointer-none":""}"
          @keyup=${()=>{}}
          @click=${()=>{var t;(t=this.dropRegion)===null||t===void 0||t.click()}}
          >${this.taskStatus?this.taskStatus:"Drag & Drop an image file here or"}</span
        >
        <button
          id="file-picker"
          @click=${()=>{var t;(t=this.dropRegion)===null||t===void 0||t.click()}}
          class="ia-button primary ${this.showLoadingIndicator?"pointer-none hidden":""}"
        >
          Pick image to upload
        </button>
        <span class="error">${this.fileValidationError}</span>
        <form
          method="post"
          id="save-file"
          enctype="multipart/form-data"
          action="${e}"
        >
          <input
            class="file-selector"
            name="file"
            type="file"
            accept="image/*"
            style="display: none;"
          />
          <input type="hidden" name="identifier" .value="${this.identifier}" />
          <button
            id="file-submit"
            type="submit"
            name="submit"
            value="SUBMIT"
            class="ia-button
            ${!this.showDropper||this.fileValidationError!==""?"hidden":""}
            ${this.fileValidationError||this.showLoadingIndicator?"pointer-none hidden":""}"
          >
            ${this.showLoadingIndicator?this.loadingIndicatorTemplate:"Submit"}
          </button>
        </form>
        <div
          class="image-preview full-preview
          ${this.showLoadingIndicator?"pointer-none hidden":""}"
          @keyup=${()=>{}}
          @click=${()=>{var t;(t=this.dropRegion)===null||t===void 0||t.click()}}
        ></div>
      </div>
    `}get selectFileTemplate(){return E`
      <div class="select-region">
        <input
          class="file-selector"
          name="file"
          type="file"
          accept="image/*"
          style="display: none;"
        />
        <div class="select-message">
          Drop a new image onto<br />your picture here or<br />
          <a
            href="#"
            id="upload-region"
            class="${this.showLoadingIndicator?"pointer-none":""}"
            >select an image to upload</a
          >
        </div>
      </div>
      <span class="error">${this.fileValidationError}</span>
    `}get overlayTemplate(){return E`
      <div
        class="overlay ${this.showLoadingIndicator?"show-overlay pointer-none":""}"
        @keyup="${()=>{}}"
        @click=${()=>{var e;(e=this.dropRegion)===null||e===void 0||e.click()}}
      >
        ${this.showLoadingIndicator?this.loadingIndicatorTemplate:this.plusSVGTemplate(25,25,"#fff","#333333")}
      </div>
    `}plusSVGTemplate(e,t,i,o){return Ie`<svg
      class="plus-icon"
      width="${t}"
      height="${e}"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12.8137" cy="13.3699" r="12.5" fill="${i}"/>
      <path d="M11.3137 5.36987H14.3137V21.3699H11.3137V5.36987Z" fill="${o}"/>
      <path d="M4.56366 14.8699V11.8699H21.0637V14.8699H4.56366Z" fill="${o}"/>
    </svg>
    `}render(){return E`
      <div
        class="profile-section profile-hover
        ${this.lookingAtMyAccount?"":"pointer-none"}
        ${this.type==="full"?"adjust-full":""}
      "
      >
        ${this.type==="compact"?this.overlayTemplate:p}
        <div
          id="drop-region"
          class="image-preview
            ${this.type==="full"?"full-preview":""}
            ${this.showLoadingIndicator?"pointer-none":""}"
        >
          <img alt="user profile" src="${this.picture}" />
        </div>
        ${this.type==="full"?this.selfSubmitFormTemplate:p}
      </div>
      ${this.type==="compact"?this.selectFileTemplate:p}
    `}static get styles(){const e=f`var(--imgMaxHeight, 100px)`,t=f`var(--imgMaxWidth, 200px)`;return f`
      ${Qe}

      :host {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        display: inline-block;
      }

      :host *:focus,
      :host *:focus-visible {
        outline: none;
      }

      a,
      a:hover,
      a:focus {
        color: #4b64ff;
      }

      .profile-section,
      .select-region {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        position: relative;
        font-size: 1.4rem;
      }

      .profile-section {
        border-radius: 100%;
        width: fit-content;
        line-height: normal;
        height: fit-content;
      }

      .adjust-full {
        width: fit-content;
      }

      .profile-section > .full-preview img {
        max-height: ${e};
        max-width: ${t};
      }

      .profile-section:hover .overlay {
        display: block;
        z-index: 1;
      }

      .show-overlay {
        display: block !important;
        z-index: 1;
        background: none !important;
      }

      .show-overlay + .image-preview img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
        opacity: 0.2;
      }

      .profile-hover:hover .self-submit-form {
        display: block;
      }

      .image-preview {
        border-radius: 100%;
      }

      .image-preview img {
        height: 120px;
        width: 120px;
        max-height: 120px;
        max-width: 120px;
        background-size: cover;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        position: relative;
        overflow: hidden;
      }

      .overlay:hover + .image-preview img,
      .overlay.window-drag-over + .image-preview img,
      .image-preview:hover img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
        opacity: 0.5;
        cursor: pointer;
      }

      .overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 100%;
        transform: translate(-50%, -50%);
        text-align: center;
        cursor: pointer;
        font-size: 2rem;
        font-weight: bold;
        display: none;
        padding: 5px;
        min-width: 16px;
        line-height: 1.5rem;
      }

      .full-preview img {
        cursor: default;
        width: auto;
        height: 100%;
        border-radius: 0% !important;
      }

      .vertical-center {
        top: 10px !important;
      }

      .self-submit-form {
        box-sizing: border-box;
        background: white;
        border: 3px solid #ccc;
        border-radius: 10px;
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 200px;
        padding: 11px;
        text-align: center;
        justify-content: center;
        z-index: 3;
        justify-items: center;
      }

      @media (max-width: 1350px) {
        .self-submit-form {
          left: 100%;
        }
      }

      .plus-icon {
        pointer-events: none;
      }

      .self-submit-form .full-preview img {
        height: auto;
      }

      .close-button {
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 5px;
        border: none;
        font-size: 1rem;
        background: white;
      }
      .close-button:hover {
        cursor: pointer;
      }

      .self-submit-form.drag-over {
        border: 3px dashed #ccc;
      }

      .self-submit-form .drag-text {
        font-weight: bold;
        font-size: 1.2rem;
        cursor: default;
        color: #000;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 15px;
      }

      .window-drag-over {
        display: block;
        z-index: 1;
      }

      .hidden {
        display: none;
      }

      .pointer-none {
        pointer-events: none;
      }

      #file-picker {
        margin: 2px auto;
        padding: 0 1rem;
      }

      #file-submit {
        padding: 0 1rem;
        margin: 4px auto;
        background-color: #5cb85c;
        justify-content: center;
        width: 8rem;
        border-color: #4cae4c;
      }

      #file-submit:hover {
        background-color: #47a447;
        border-color: #398439;
      }

      .error {
        margin: 3px 0px;
        font-size: 1.2rem;
        color: #bb0505;
        overflow: hidden;
        word-wrap: unset;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .self-submit-form ia-activity-indicator {
        display: inline-block;
        width: 20px;
        color: white;
        margin-top: 2px;
        --activityIndicatorLoadingRingColor: #000;
        --activityIndicatorLoadingDotColor: #000;
      }

      .show-overlay ia-activity-indicator {
        display: inline-block;
        width: 25px;
        color: white;
        margin-top: 2px;
        --activityIndicatorLoadingRingColor: #000;
        --activityIndicatorLoadingDotColor: #000;
      }
    `}};h([b({type:String})],u.prototype,"identifier",void 0);h([b({type:String})],u.prototype,"endpoint",void 0);h([b({type:String})],u.prototype,"picture",void 0);h([b({type:String})],u.prototype,"type",void 0);h([b({type:Boolean})],u.prototype,"lookingAtMyAccount",void 0);h([b({type:Number})],u.prototype,"maxFileSizeInMB",void 0);h([b({type:Array})],u.prototype,"validFileTypes",void 0);h([V()],u.prototype,"showLoadingIndicator",void 0);h([V()],u.prototype,"taskStatus",void 0);h([V()],u.prototype,"fileValidationError",void 0);h([V()],u.prototype,"showDropper",void 0);h([m("#drop-region")],u.prototype,"dropRegion",void 0);h([m("#upload-region")],u.prototype,"uploadRegion",void 0);h([m(".profile-section")],u.prototype,"profileSection",void 0);h([m(".overlay")],u.prototype,"overlay",void 0);h([m(".plus-icon")],u.prototype,"plusIcon",void 0);h([m("#save-file")],u.prototype,"saveFile",void 0);h([m(".self-submit-form")],u.prototype,"selfSubmitEle",void 0);h([m(".file-selector")],u.prototype,"fileSelector",void 0);u=h([Se("ia-pic-uploader")],u);let N=class extends x{render(){return E`
      <div id="demo"></div>
        <div class="container">
          <div class="full">
            <h3>It will be used at My Uploads page</h3>
            <ia-pic-uploader
              lookingAtMyAccount
              maxFileSizeInMB="3"
              id="full"
              identifier="@453344354534"
              picture="/demo/wider-image.jpg"
              endpoint=""
              .validFileTypes=${["image/jpeg","image/png","image/gif"]}
              type="full"
            ></ia-pic-uploader>
          </div>
          <div class="compact">
            <h3>It will be used at new account settings page</h3>
            <ia-pic-uploader
              lookingAtMyAccount
              maxFileSizeInMB="3"
              id="compact"
              identifier="@453344354534"
              picture="/demo/default-preview.jpg"
              @fileChanged=${e=>{console.log("called hasErrorFiled()!"),console.log(e.detail)}}
              @fileUploaded=${()=>{console.log("file Uploaded")}}
            ></ia-pic-uploader>
          </div>
        </div>
      </div>
    `}static get styles(){return f`
      #demo {
        margin: 50px;
        display: flex;
        justify-items: center;
        align-items: center;
        font-size: 14px;
      }

      .select-message {
        display: none;
      }

      ia-pic-uploader {
        --imgMaxHeight: 200px;
        --imgMaxWidth: 200px;
      }
      ia-pic-uploader:focus {
        outline: none;
      }

      ia-pic-uploader:focus-visible {
        outline: none;
      }

      .container {
        display: flex;
        width: 100%;
        justify-content: center;
        flex-direction: column;
      }

      .full {
        display: flex;
        flex-direction: column;
      }

      .full, .compact {
        padding: 25px 50px;
        border: 1px solid black;
        margin: 20px;
      }
    `}};h([m("#full")],N.prototype,"full",void 0);h([m("#compact")],N.prototype,"compact",void 0);N=h([Se("app-root")],N);
