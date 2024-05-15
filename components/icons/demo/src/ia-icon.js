/* eslint-disable import/no-relative-packages */
import {
  LitElement, html, css, nothing
} from 'lit';
import advance from '../../icon-advance/index.js';
import applePay from '../../icon-applepay/index.js';
import audio from '../../icon-audio/index.js';
import calendar from '../../icon-calendar/index.js';
import calendarBlank from '../../icon-calendar-blank/index.js';
import close from '../../icon-close/index.js';
import closeCircle from '../../icon-close-circle/index.js';
import collapseSidebar from '../../icon-collapse-sidebar/index.js';
import creditCard from '../../icon-credit-card/index.js';
import donate from '../../icon-donate/index.js';
import download from '../../icon-dl/index.js';
import editPencil from '../../icon-edit-pencil/index.js';
import ellipses from '../../icon-ellipses/index.js';
import email from '../../icon-email/index.js';
import facebook from '../../icon-facebook/index.js';
import googlePay from '../../icon-googlepay/index.js';
import iaLogo from '../../icon-ia-logo/index.js';
import images from '../../icon-images/index.js';
import link from '../../icon-link/index.js';
import localePin from '../../icon-locale-pin/index.js';
import lock from '../../icon-lock/index.js';
import magnifyMinus from '../../icon-magnify-minus/index.js';
import magnifyPlus from '../../icon-magnify-plus/index.js';
import paypal from '../../icon-paypal/index.js';
import pinterest from '../../icon-pinterest/index.js';
import search from '../../icon-search/index.js';
import share from '../../icon-share/index.js';
import software from '../../icon-software/index.js';
import sortAscending from '../../icon-sort-ascending/index.js';
import sortDescending from '../../icon-sort-descending/index.js';
import texts from '../../icon-texts/index.js';
import toc from '../../icon-toc/index.js';
import tumblr from '../../icon-tumblr/index.js';
import twitter from '../../icon-twitter/index.js';
import upload from '../../icon-upload/index.js';
import user from '../../icon-user/index.js';
import venmo from '../../icon-venmo/index.js';
import video from '../../icon-video/index.js';
import visualAdjustment from '../../icon-visual-adjustment/index.js';
import volumes from '../../icon-volumes/index.js';
import web from '../../icon-web/index.js';
import info from '../../icon-info/index.js';

const iconTemplates = {
  advance,
  applePay,
  audio,
  calendar,
  calendarBlank,
  close,
  closeCircle,
  collapseSidebar,
  creditCard,
  donate,
  download,
  editPencil,
  ellipses,
  email,
  facebook,
  googlePay,
  iaLogo,
  images,
  link,
  localePin,
  lock,
  magnifyMinus,
  magnifyPlus,
  paypal,
  pinterest,
  search,
  share,
  software,
  sortAscending,
  sortDescending,
  texts,
  toc,
  tumblr,
  twitter,
  upload,
  user,
  venmo,
  video,
  visualAdjustment,
  volumes,
  web,
  info,
};

class IAIcon extends LitElement {
  static get properties() {
    return {
      icon: { type: String },
    };
  }

  static get styles() {
    return css`
      svg {
        width: var(--iconWidth, 'auto');
        height: var(--iconHeight, 'auto');
      }

      .fill-color {
        fill: var(--iconFillColor);
      }

      .stroke-color {
        stroke: var(--iconStrokeColor);
      }
    `;
  }

  constructor() {
    super();
    this.icon = '';
  }

  render() {
    return html`${iconTemplates[this.icon]}` || nothing;
  }
}

customElements.define('ia-icon', IAIcon);

export default IAIcon;
