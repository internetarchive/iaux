import { css } from 'lit-element';

export default css`

  :host {
    --buttonBlue: #194880;
    --white: #fff;
    --textColor: #333;

    --iconFillColor: var(--white);
    --linkColor: var(--white);
  }
  .grid-container {
    margin: 100px;
  }

  .favorite-button.favorited, .favorite-button:hover {
    color: #f0b534! important;
    border: 1px solid #f0b534;
    background-color: #fcf0d6;
  }
  .favorite-button .favorite-icon {
    color: #f0b534! important;
  }

  .share-button:hover {
    color: #428bca! important;
    border: 1px solid #428bca;
    background-color: #d9e8f4;
  }

  .borrow-program-button:hover {
    color: #428bca! important;
    border: 1px solid #428bca;
    background-color: #d9e8f4;
  }

  .flag-button:hover, .flag-button:focus {
    color: rgba(190, 16, 36, 1) !important;
    background-color: rgba(190, 16, 36, 0.29) !important;
    border: rgba(190, 16, 36, 1) solid 1px;
  }
  

  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    height: 40px;
    display: inline;
    vertical-align: middle;
  }
  .favorite-button, .share-button, .flag-button {
    width: 84px;
  }
  .button span {
    display: block;
  }
  .favorite-icon {
    height: 15px;
  }
  .borrow-program-button {
    padding: 0 5px;
    vertical-align: middle;
    border: 1px solid black;
    text-decoration: none;
    color: var(--textColor);
  }

  .button {
    border-radius: 3px;
    text-decoration: none;
    display: inline-block;
    font: normal 1.2rem/1.5 var(--themeFontFamily);
    border: 1px solid black;
    color: var(--textColor);
    outline: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    pointer: cursor;
  }
  .search-field .fill-color {
    fill: var(--iconFill);
  }

  input:focus + svg {
    display: none;
  }

  #flag-button-container {
    position: relative;
  }

  .dropdown-menu .dropdown-title {
    background-color: #f6d8de;
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid #d0021b;
    margin: 0;
    padding: 15px 10px;
  }
  .dropdown-menu ul {
    padding: 0;
    margin: 0;
  }
  .dropdown-menu ul li {
    padding: 8px 12px;
    list-style: none;
    border-bottom: 1px solid #f1f1f1;
  }
  .dropdown-menu {
    color: #d0021b;
    border: 2px solid #d0021b;
    width: 210px;
    padding: 0;
    text-align: left;
    margin-bottom: 10px;

    position: absolute;
    left: auto;
    right: 0;
    top: auto;
    bottom: 200%;
    z-index: 1000;
    /* display: none; */
    /* float: left; */
    /* min-width: 160px; */
    margin: 2px 0 0;
    /* list-style: none; */
    /* font-size: 14px; */
    background-color: #fff;
    /* border: 1px solid #ccc; */
    border: 1px solid rgba(0,0,0,.15);
    /* border-radius: 4px; */
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    background-clip: padding-box;
  }

  .hidden {
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
