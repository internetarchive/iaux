import { css } from 'https://offshoot.prod.archive.org/lit.js';

export default css`
  button:focus,
  a:focus,
  input:focus {
    outline: none;
  }

  nav {
    position: relative;
    display: flex;
    height: 4rem;
    grid-template-areas: 'hamburger empty heart search user';
    -ms-grid-columns: 4rem minmax(1rem, 100%) 4rem 4rem 4rem;
    grid-template-columns: 4rem auto 4rem 4rem 4rem;
    -ms-grid-rows: 100%;
    grid-template-rows: 100%;
    background: var(--primaryNavBg);
    border-bottom: 1px solid var(--primaryNavBottomBorder);
  }

  nav.hide-search {
    grid-template-areas: 'hamburger empty heart user';
    -ms-grid-columns: 4rem minmax(1rem, 100%) 4rem 4rem;
    grid-template-columns: 4rem auto 4rem 4rem;
  }

  .right-side-section {
    display: flex;
    margin-left: auto;
    user-select: none;
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

  .ia-logo {
    height: 3rem;
    width: 2.7rem;
    display: inline-block;
  }
  .ia-wordmark {
    height: 3rem;
    width: 9.5rem;
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
  .hamburger svg {
    height: 4rem;
    width: 4rem;
    fill: var(--activeColor);
  }

  .mobile-donate-link {
    display: inline-block;
  }
  .mobile-donate-link svg {
    height: 4rem;
    width: 4rem;
  }
  .mobile-donate-link .fill-color {
    fill: rgb(255, 0, 0);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    user-select: none;
  }

  .search-trigger {
    padding: 0;
  }
  .search-trigger svg {
    height: 4rem;
    width: 4rem;
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

  .upload svg {
    height: 3rem;
    width: 3rem; 
  }

  .screen-name {
    display: none;
    font-size: 1.3rem;
    vertical-align: middle;
    text-transform: uppercase;
  }

  .user-menu {
    color: var(--lightTextColor);
    padding: 0.5rem;
    height: 100%;
  }

  .user-menu:hover,
  .user-menu:focus {
    color: var(--linkHoverColor);
  }

  .user-menu.active {
    border-radius: 1rem 1rem 0 0;
    background: var(--activeButtonBg);
  }

  .user-menu img {
    display: block;
    width: 3rem;
    height: 3rem;
  }

  .link-home {
    text-decoration: none;
    display: inline-flex;
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

    .right-side-section {
      display: initial;
    }
    .right-side-section .user-info {
      float: right;
    }
  }

  @media (min-width: 890px) {
    :host {
      --userIconWidth: 3.2rem;
      --userIconHeight: 3.2rem;
    }

    nav {
      display: flex;
      z-index: 4;
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
      display: block;
      float: right;
      vertical-align: middle;
      height: 100%;
    }

    .user-info .user-menu img {
      height: 3rem;
      width: 3rem;
      margin-right: 0.5rem;
    }

    .user-menu {
      padding: 1rem 0.5rem;
    }
    .user-menu.active {
      background: transparent;
    }

    .user-menu img {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.5rem;
    }

    .upload {
      display: block;
      padding: 1rem 0.5rem;
      float: right;
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
