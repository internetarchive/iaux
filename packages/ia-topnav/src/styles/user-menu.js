import { css } from 'lit-element';

export default css`
  :host {
    --topOffset: -100vh;
  }
  nav {
    position: absolute;
    top: var(--topOffset);
    right: 0;
    z-index: 1;
    font-size: 1.6rem;
    background-color: var(--grey20);
  }
  nav {
    overflow: hidden;
    transition-property: top;
    transition-duration: 0.5s;
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
    max-height: 100vh;
    max-width: 100vw;
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
  a {
    display: block;
    color: var(--primary-text-color);
    text-decoration: none;
    padding: 1rem 2rem;
  }
  @media (min-width: 890px) {
    nav {
      overflow: visible;
      top: 5.1rem;
      right: 26rem;
      z-index: 2;
      transition: opacity .2s ease-in-out;
      font-size: 1.4rem;
      border-radius: 2px;
      background: var(--white);
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

    a {
      padding: .5rem 2rem;
      color: var(--grey20);
      transition: background .1s ease-out, color .1s ease-out;
    }

    a:hover,
    a:active,
    a:focus {
      color: var(--white);
      background: var(--link-color);
    }

    .initial,
    .closed {
      top: 5.1rem;
      opacity: 0;
      transition-duration: .2s;
    }

    .open {
      top: 5.1rem;
      opacity: 1;
    }
  }
`;
