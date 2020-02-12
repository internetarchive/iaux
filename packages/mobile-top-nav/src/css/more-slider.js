import { css } from 'lit-element';

export default () => {
  return css`
    ul {
      padding: 1rem;
      margin: 0;
      list-style: none;
    }
    a {
      text-decoration: none;
      color: var(--activeColor);
    }
  `;
};
