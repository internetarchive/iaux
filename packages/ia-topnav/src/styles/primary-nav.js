import { css } from 'https://offshoot.prod.archive.org/lit.js';

export default css`
  button:focus,
  a:focus,
  input:focus {
    outline: none;
  }

  nav {
    position: relative;
    display: -ms-grid;
    display: grid;
    height: 40px;
    grid-template-areas: 'hamburger empty heart search user';
    -ms-grid-columns: 40px minmax(1rem, 100%) 40px 40px 40px;
    grid-template-columns: 40px auto 40px 40px 40px;
    -ms-grid-rows: 100%;
    grid-template-rows: 100%;
    background: var(--primaryNavBg);
    border-bottom: 1px solid var(--primaryNavBottomBorder);
  }

  nav.hide-search {
    grid-template-areas: 'hamburger empty heart user';
    -ms-grid-columns: 40px minmax(1rem, 100%) 40px 40px;
    grid-template-columns: 40px auto 40px 40px;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
  }

  .branding {
    position: static;
    float: left;
    padding: 0 5px 0 10px;
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
  }

  slot,
  .branding {
    display: flex;
    justify-content: left;
    align-items: center;
  }

  media-menu {
    grid-column-start: hamburger-start;
    grid-column-end: user-end;
  }

  .ia-logo,
  .ia-wordmark {
    margin-right: 5px;
  }

  .hamburger {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
    grid-area: hamburger;
    padding: 0;
  }

  .mobile-donate-link {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
    grid-area: heart;
    position: relative;
    padding: 0;
    z-index: 1;
    width: 100%;
    text-align: right;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .mobile-donate-link svg {
    height: 50px;
    width: 50px;
    margin-top: -5px;
    margin-left: -5px;
  }
  .mobile-donate-link .fill-color {
    fill: rgb(255, 0, 0);
  }
  .mobile-donate-link .label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }

.search-trigger {
    -ms-grid-row: 1;
    -ms-grid-column: 4;
    grid-area: search;
    position: relative;
    padding: 0;
    z-index: 1;
    width: 100%;
    text-align: right;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .search-trigger .fill-color {
    fill: var(--iconFill);
  }

  .search-activated {
    position: relative;
    z-index: 3;
  }

  .upload {
    display: none;
  }

  .upload span {
    display: none;
  }

  .user-info {
    -ms-grid-row: 1;
    -ms-grid-column: 5;
    grid-area: user;
    -ms-grid-row-align: stretch;
    align-self: stretch;
    -ms-grid-column-align: end;
    justify-self: end;
  }

  .screen-name {
    display: none;
    font-size: 1.3rem;
    vertical-align: middle;
    text-transform: uppercase;
  }

  .user-menu {
    height: 100%;
    padding: 0.5rem 1rem;
    color: var(--lightTextColor);
  }

  .user-menu:hover {
    color: var(--linkHoverColor);
  }

  .user-menu.active {
    border-radius: 1rem 1rem 0 0;
    background: var(--activeButtonBg);
  }

  .user-menu img {
    display: block;
    width: 30px;
    height: 30px;
  }

  .link-home {
    display: flex;
    text-decoration: none;
  }

  @media only screen and (min-width: 890px) and (max-device-width: 905px) {
    .branding.second-logo {
      padding-right: 0;
    }
  }

  @media (min-width: 906px) {
    .branding.second-logo {
      padding-right: 20px;
    }
  }

  @media (max-width: 889px) {
    slot[name='opt-sec-logo'] {
      display: none;
    }
  }

  @media (min-width: 890px) {
    :host {
      --userIconWidth: 32px;
      --userIconHeight: 32px;
    }

    nav {
      display: block;
      height: 5rem;
      padding-right: 1.5rem;
    }

    slot[name='opt-sec-logo-mobile'] {
      display: none;
    }

    .branding {
      margin-top: 1rem;
    }

    .ia-logo,
    .ia-wordmark {
      margin-right: 10px;
    }

    .hamburger,
    .search-trigger,
    .mobile-donate-link {
      display: none;
    }

    .user-info {
      float: right;
      padding-top: 1rem;
    }

    .user-menu {
      padding-top: 0;
    }

    .user-menu.active {
      background: transparent;
    }

    .user-menu img {
      display: inline-block;
      vertical-align: middle;
    }

    .upload {
      display: block;
      float: right;
      margin-top: 1rem;
      font-size: 1.4rem;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--lightTextColor);
    }
    .upload:active,
    .upload:focus,
    .upload:hover {
      color: var(--linkHoverColor);
    }

    .upload svg {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      fill: var(--iconFill);
    }

    .upload:hover svg,
    .upload:focus svg,
    .upload:active svg {
      fill: var(--linkHoverColor);
    }

    nav-search {
      float: right;
      margin-left: 1rem;
      z-index: 4;
      position: inherit;
    }

    login-button {
      display: block;
      margin-right: 1rem;
    }
  }

  @media (min-width: 990px) {
    .screen-name {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 165px;
    }

    .upload span {
      display: inline;
    }
  }
`;
