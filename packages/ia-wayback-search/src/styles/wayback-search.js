import { css } from 'lit-element';

export default css`
  :host {
    font: normal 1.2rem/1.5 var(--themeFontFamily);
  }

  form {
    max-width: 600px;
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
    width: 100%;
    max-width: 215px;
    max-height: 60px;
    margin-bottom: 1.3rem;
    vertical-align: middle;
  }

  input {
    display: block;
    width: 100%;
    height: 3rem;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    font: normal 1.2rem/1.5 var(--themeFontFamily);
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

  .search-field svg {
    position: absolute;
    top: 2px;
    left: 3px;
    width: 24px;
    height: 24px;
  }

  .search-field .fill-color {
    fill: var(--iconFill);
  }

  input:focus + svg {
    display: none;
  }

  @media (min-width: 890px) {
    form {
      margin: 0 auto;
    }

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

    .search-field svg {
      width: 28px;
      height: 28px;
    }

    .search-field .fill-color {
      fill: var(--desktopSearchIconFill);
    }
  }
`;
