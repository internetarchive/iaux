import { css } from 'lit-element';

export default css`
  :host {
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    grid-column: 1 / 4;
  }

  form {
    padding: 0 5rem 0 2rem;
  }

  p {
    margin-top: 0;
    font-weight: 200;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: var(--activeColor);
  }

  fieldset {
    max-width: 600px;
    padding: 0.7rem 2rem;
    margin: 1.5rem 0;
    box-sizing: border-box;
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
    margin-bottom: 1.3rem;
    max-width: 100%;
    vertical-align: middle;
  }

  input {
    display: block;
    width: 100%;
    height: 3rem;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    font: normal 1.2rem/1.5 var(--theme-font-family);
    color: #858585;
    box-sizing: border-box;
    border: 1px solid var(--grey80);
    border-radius: 2rem;
    background: #eee;
  }

  input:focus {
    border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    outline: none;
  }

  .search-field {
    position: relative;
    overflow: hidden;
  }

  .search-field search-image {
    position: absolute;
    top: 2px;
    left: 3px;
  }

  input:focus + search-image {
    display: none;
  }

  @media (min-width: 890px) {
    p {
      margin-bottom: 3rem;
      font-size: 1.6rem;
      text-align: center;
    }

    img {
      margin: 0;
    }

    fieldset {
      margin: 0 auto;
      font-size: 0;
    }

    fieldset a,
    .search-field {
      display: inline-block;
      width: 50%;
      vertical-align: middle;
    }

    fieldset a {
      text-align: center;
    }
  }
`;
