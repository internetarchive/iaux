import { css } from 'lit-element';

export default css`
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
    margin-top: 0;
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
    justify-content: space-evenly;
    text-align: center;
  }

  .icon-links a {
    display: inline-block;
    width: 120px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
  }
  .icon-links a + a {
    margin-left: 2rem;
  }
`;
