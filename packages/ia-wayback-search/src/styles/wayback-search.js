import { css } from 'https://offshoot.prod.archive.org/lit.js';

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
    color: #000;
    box-sizing: border-box;
    border: 1px solid #000;
    border-radius: 2rem;
    background: #fff;
  }

  .search-background {
    padding: 0.7rem 2rem;
    margin: 1.5rem 0;
    box-sizing: border-box;
    text-align: center;
    border: none;
    border-radius: 7px;
    background-color: #fcf5e6;
    box-shadow: 3px 3px 0 0 #c3ad97;
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

    .search-background {
      margin: 0 auto;
      font-size: 0;
    }

    .search-background a,
    .search-field {
      display: inline-block;
      width: 50%;
      vertical-align: middle;
    }

    .search-background a {
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
