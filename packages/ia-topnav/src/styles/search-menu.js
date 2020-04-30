import { css } from 'lit-element';

export default css`
  button:focus,
  input:focus {
    outline-color: var(--linkColor);
    outline-width: 0.16rem;
    outline-style: auto;
  }
  .search-menu {
    position: absolute;
    top: -50vh;
    right: 0;
    left: 0;
    z-index: 1;
    padding: 0 4.5rem;
    font-size: 1.6rem;
    background-color: var(--searchMenuBg);
  }
  .tx-slide {
    overflow: hidden;
    transition-property: top;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }
  .initial,
  .closed {
    top: -50vh;
  }
  .closed {
    transition-duration: 0.2s;
  }
  .open {
    top: 4rem;
  }

  label,
  a {
    padding: 1rem;
    display: block;
  }

  .advanced-search {
    text-decoration: none;
    color: var(--linkColor);
  }

  @media (min-width: 890px) {
    .search-menu {
      overflow: visible;
      top: calc(100% + 7px);
      right: 2rem;
      left: auto;
      z-index: 5;
      padding: 1rem 2rem;
      transition: opacity .2s ease-in-out;
      font-size: 1.4rem;
      color: var(--inverseTextColor);
      border-radius: 2px;
      background: var(--primaryTextColor);
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, .15);
    }

    .search-menu:after {
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

    .initial,
    .closed {
      left: 100%;
      opacity: 0;
      transition-duration: .2s;
    }

    .open {
      top: 5.1rem;
      opacity: 1;
    }

    label {
      padding: 0;
    }

    label + label {
      padding-top: 7px;
    }

    a {
      padding: 1rem 0 0 0;
    }
  }
`;
