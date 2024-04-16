import { css } from 'https://offshoot.prod.archive.org/lit.js';

export default css`
  ul {
    position: relative;
    z-index: 3;
    padding: .8rem 0;
    margin: 0;
    font-size: 1.2rem;
    text-transform: uppercase;
    text-align: center;
    background: var(--desktopSubnavBg);
  }

  li {
    display: inline-block;
    padding: 0 15px;
  }

  a {
    text-decoration: none;
    color: var(--subnavLinkColor);
  }

  a:hover,
  a:active,
  a:focus {
    color: var(--linkHoverColor);
  }

  .donate svg {
    width: 1.6rem;
    height: 1.6rem;
    vertical-align: -4px;
    fill: #f00;
  }
`;
