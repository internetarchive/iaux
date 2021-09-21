import { css } from 'lit';

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
    height: 4rem;
    grid-template-areas: 'hamburger empty search user';
    -ms-grid-columns: 4rem minmax(1rem, 100%) 4.3rem 4rem;
    grid-template-columns: 4rem auto 4.3rem 4rem;
    -ms-grid-rows: 100%;
    grid-template-rows: 100%;
    background: var(--primaryNavBg);
    border-bottom: 1px solid var(--primaryNavBottomBorder);
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

  .search-trigger {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
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
    -ms-grid-column: 4;
    grid-area: user;
    -ms-grid-row-align: stretch;
    align-self: stretch;
    -ms-grid-column-align: end;
    justify-self: end;
  }

  .username {
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
      z-index: 2;
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
    .search-trigger {
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
    }

    login-button {
      display: block;
      margin-right: 1rem;
    }
  }

  @media (min-width: 990px) {
    .username {
      display: inline-block;
    }

    .upload span {
      display: inline;
    }
  }
`;
