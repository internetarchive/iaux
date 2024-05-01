import { css } from 'https://offshoot.prod.archive.org/lit.js';

export default css`
  .logged-out-toolbar a:focus,
  .logged-out-toolbar a:focus-visible {
    color: var(--linkHoverColor);
    outline: none;
  }
  .dropdown-toggle {
    display: block;
    height: 100%;
    font-size: 1.6rem;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--grey80);
    cursor: pointer;
  }

  .dropdown-toggle .fill-color {
    fill: var(--iconFill);
  }

  .dropdown-toggle:active .fill-color,
  .dropdown-toggle:focus .fill-color,
  .dropdown-toggle:hover .fill-color {
    fill: var(--linkHoverColor);
  }

  button {
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
  }
  .active {
    border-radius: 1rem 1rem 0 0;
    background: var(--activeButtonBg);
  }

  .active .fill-color {
    fill: var(--activeColor);
  }

  span {
    display: none;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: var(--loginTextColor);
  }

  span a {
    color: inherit;
    text-decoration: none;
  }

  a:hover,
  a:active,
  a:focus {
    color: var(--linkHoverColor);
  }

  @media (min-width: 890px) {
    .logged-out-toolbar1 {
      transform: translateY(-.5rem);
    }

    .active {
      background: transparent;
    }

    .dropdown-toggle {
      display: inline-block;
      vertical-align: middle;
    }

    span {
      display: inline;
      vertical-align: middle;
    }
  }
`;
