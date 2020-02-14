import { css } from 'lit-element';

export default () => {
  return css`
    ul {
      padding: 1rem 0;
      margin: 0;
      list-style: none;
    }
    a {
      display: block;
      padding: 1rem 0;
      text-decoration: none;
      color: var(--activeColor);
    }
  `;
};
