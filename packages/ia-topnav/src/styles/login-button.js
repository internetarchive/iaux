import { css } from 'lit-element';

export default css`
  a {
    display: block;
    font-size: 1.6rem;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--grey80);
  }

  span {
    display: none;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: var(--grey999);
  }

  @media (min-width: 890px) {
    span {
      display: inline;
    }
  }
`;
