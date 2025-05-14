import { css } from 'lit';

export default css`
  .menu-wrapper {
    position: relative;
  }

  button:focus,
  input:focus {
    outline-color: var(--linkColor);
    outline-width: 0.16rem;
    outline-style: auto;
    outline-offset: 2px !important;
  }
  .search-menu-inner {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 4;
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
    top: var(--topOffset, -1500px);
  }
  .closed {
    transition-duration: 0.2s;
  }

  label,
  a {
    padding: 1rem;
    display: block;
  }

  .advanced-search {
    text-decoration: none;
    color: var(--linkColor);
    line-height: normal;
    padding: 0.5rem;
    margin-top: 5px;
  }

  @media (min-width: 890px) {
    .search-menu-inner {
      overflow: visible;
      right: 2rem;
      left: auto;
      z-index: 5;
      padding: 1rem 2rem;
      transition: opacity 0.2s ease-in-out;
      font-size: 1.4rem;
      color: var(--inverseTextColor);
      border-radius: 2px;
      background: var(--primaryTextColor);
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
    }

    .search-menu-inner:after {
      position: absolute;
      right: 7px;
      top: -7px;
      width: 12px;
      height: 7px;
      box-sizing: border-box;
      color: #fff;
      content: '';
      border-bottom: 7px solid currentColor;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }

    .initial,
    .closed {
      opacity: 0;
      transition-duration: 0.2s;
    }

    .open {
      opacity: 1;
    }

    label {
      padding: 0;
      font-weight: normal;
      margin: 0;
    }

    label + label {
      padding-top: 7px;
    }

    a {
      padding: 1rem 0 0 0;
    }
  }
`;
