import { css } from 'https://offshoot.prod.archive.org/lit.js';

export default css`
  .dropdown-toggle {
    display: block;
    text-transform: uppercase;
    color: var(--grey80);
    cursor: pointer;
  }

  .dropdown-toggle svg {
    height: 100%;
    width: 4rem;
  }

  .dropdown-toggle .fill-color {
    fill: var(--iconFill);
  }

  .dropdown-toggle:active .fill-color,
  .dropdown-toggle:focus .fill-color,
  .dropdown-toggle:hover .fill-color {
    fill: var(--linkHoverColor);
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
    .logged-out-toolbar {
      padding: 1rem 0.5rem;
      vertical-align: middle;
    }

    .active {
      background: transparent;
    }

    .dropdown-toggle {
      display: inline-block;
      vertical-align: middle;
    }

    .dropdown-toggle svg {
      height: 3rem;
      width: 3rem;
      display: block;
    }

    span {
      display: inline;
      vertical-align: middle;
    }
  }
`;
