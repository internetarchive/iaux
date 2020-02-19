import { css } from 'lit-element';

export default () => {
  return css`
    a {
      text-decoration: none;
      color: var(--activeColor);
    }

    img {
      display: block;
      width: 90px;
      height: 90px;
      margin: 0 auto 1rem auto;
      border-radius: 45px;
    }

    h3 {
      font-size: 1.8rem;
    }

    h4 {
      font-size: 1.6rem;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    li + li {
      padding-top: 1.5rem;
    }

    .icon-links {
      display: flex;
      align-items: flex-start;
    }

    .icon-links a {
      display: block;
      max-width: 120px;
      margin-bottom: 1.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .icon-links a + a {
      margin-left: 2rem;
    }
  `;
};
