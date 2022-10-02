import { css } from 'https://offshoot.ux.archive.org/lit.js';

export const subnavListCSS = css`
  h4 {
    font-size: 1.6rem;
  }

  a {
    text-decoration: none;
    color: var(--activeColor);
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li + li {
    padding-top: 1.5rem;
  }

  @media (min-width: 890px) {
    h4 {
      margin: 0 0 1rem 0;
      font-weight: 100;
    }

    ul {
      font-size: 1.3rem;
    }

    li {
      padding-bottom: .5rem;
    }

    li + li {
      padding-top: 0;
    }

    li a {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
