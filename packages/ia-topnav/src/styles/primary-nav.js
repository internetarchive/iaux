import { css } from 'lit-element';

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
    grid-template-areas: "hamburger empty search user";
    -ms-grid-columns: 4rem minmax(1rem, 100%) 4.3rem 5rem;
    grid-template-columns: 4rem auto 4.3rem 5rem;
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
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    text-decoration: none;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  slot,
  .branding {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  media-menu {
    grid-column-start: hamburger-start;
    grid-column-end: user-end;
  }

  .ia-logo {
    display: block;
  }

  .ia-wordmark {
    display: none;
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
    padding: .5rem 1rem;
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

    .branding {
      position: static;
      float: left;
      margin-top: 1rem;
      padding: 0 10px 0 13px;
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      transform: translate(0, 0);
    }

    .ia-logo,
    .ia-wordmark {
      display: inline-block;
      vertical-align: middle;
    }

    .ia-wordmark {
      margin-left: 1rem;
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
