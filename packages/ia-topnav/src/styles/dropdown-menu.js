import { css } from 'lit-element';

export default css`
  :host {
    --topOffset: -1500px;
  }

  nav {
    position: absolute;
    top: var(--topOffset);
    right: 0;
    z-index: 1;
    overflow: hidden;
    font-size: 1.6rem;
    background-color: var(--dropdownMenuBg);
    transition-property: top;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }

  .initial,
  .closed {
    top: var(--topOffset);
  }

  .closed {
    transition-duration: 0.5s;
  }

  .open {
    top: 4rem;
    max-width: 100vw;
    overflow: auto;
  }

  h3 {
    padding: 0.6rem 2rem;
    margin: 0;
    font-size: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ul {
    padding: 0.4rem 0 0.7rem 0;
    margin: 0;
    list-style: none;
  }

  .divider {
    margin: .5rem 0;
    border-bottom: 1px solid var(--dropdownMenuDivider);
  }

  a,
  .info-item {
    display: block;
    color: var(--primaryTextColor);
    text-decoration: none;
    padding: 1rem 2rem;
  }

  .info-item {
    font-size: .8em;
    color: var(--dropdownMenuInfoItem);
  }

  @media (min-width: 890px) {
    nav {
      overflow: visible;
      top: calc(100% + 7px);
      left: auto;
      z-index: 5;
      transition: opacity .2s ease-in-out;
      font-size: 1.4rem;
      border-radius: 2px;
      background: var(--primaryTextColor);
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, .15);
    }

    nav:after {
      position: absolute;
      right: 7px;
      top: -7px;
      width: 12px;
      height: 7px;
      box-sizing: border-box;
      color: #fff;
      content: "";
      border-bottom: 7px solid currentColor;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }

    h3 {
      display: none;
    }

    .divider {
      border-bottom-color: var(--dropdownMenuDivider);
    }

    a {
      padding: .5rem 2rem;
      color: var(--inverseTextColor);
      transition: background .1s ease-out, color .1s ease-out;
    }

    .info-item {
      padding: .5rem 2rem;
      font-size: .8em;
    }

    a:hover,
    a:active,
    a:focus {
      color: var(--linkHoverColor);
      background: var(--linkColor);
    }

    .initial,
    .closed {
      opacity: 0;
      transition-duration: .2s;
    }

    .open {
      top: 5.1rem;
      opacity: 1;
      overflow: visible;
    }
  }
`;
