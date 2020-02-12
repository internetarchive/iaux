import { css } from 'lit-element';

export default () => {
  return css`
    ul {
      padding: 1rem;
      margin: 0;
      list-style: none;
    }
    a {
      display: block;
      padding: 1rem;
      text-decoration: none;
      color: var(--activeColor);
    }
  `;
};
