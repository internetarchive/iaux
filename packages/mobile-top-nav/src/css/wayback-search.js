import { css } from 'lit-element';

export default () => {
  return css`
    form {
      padding: 0 5rem 0 2rem;
    }

    p {
      font-weight: 200;
    }

    a {
      font-weight: 500;
      text-decoration: none;
      color: var(--activeColor);
    }

    fieldset {
      max-width: 600px;
      padding: .7rem 2rem;
      margin: 1.5rem auto;
      text-align: center;
      border: none;
      border-radius: 7px;
      background-color: #fcf5e6;
      box-shadow: 3px 3px 0 0 #c3ad97;
    }

    label {
      display: none;
    }

    img {
      width: 215px;
      height: 60px;
      max-width: 100%;
      vertical-align: middle;
    }

    input {
      display: block;
      width: 100%;
      height: 3rem;
      padding: .5rem 1rem .5rem 2.5rem;
      font-size: 1.2rem;
      line-height: 1.5;
      box-sizing: border-box;
      border-radius: 2rem;
      background: #eee;
    }
  `;
};
