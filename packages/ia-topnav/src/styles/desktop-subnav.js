import { css } from 'lit-element';

export default css`
  ul {
    position: relative;
    z-index: 2;
    padding: .8rem 0;
    margin: 0;
    font-size: 1.2rem;
    text-transform: uppercase;
    text-align: center;
    background: var(--grey20);
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
    color: var(--white);
  }

  .donate svg {
    width: 16px;
    height: 16px;
    vertical-align: -4px;
    fill: #f00;
  }

  @media (max-width: 767px) {
    ul {
      display: none;
    }
  }
`;
