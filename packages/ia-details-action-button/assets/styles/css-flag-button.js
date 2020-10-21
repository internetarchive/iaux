import { css } from 'lit-element';
import actionButtonCSS from '../styles/action-button';

export default css`
  ${actionButtonCSS}
  :host {
    --buttonBlue: #194880;
    --white: #fff;
    --textColor: #333;

    --iconFillColor: var(--white);
    --linkColor: var(--white);
  }

  .flag-button:hover, .flag-button:focus {
    color: rgba(190, 16, 36, 1) !important;
    background-color: rgba(190, 16, 36, 0.29) !important;
    border: rgba(190, 16, 36, 1) solid 1px;
  }

  .flagged button {
    background-color: rgba(190, 16, 36, 0.29);
    color: rgb(208, 2, 27);
  }

  a {
    pointer-events: none;
    cursor: pointer;
  }
  .flagged-text a {
    color: rgb(208, 2, 27);
    padding: 
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
    margin: 2px 0 0;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.15);
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    background-clip: padding-box;
  }
  @media (min-width: 890px) {
    .search-field .fill-color {
      fill: var(--desktopSearchIconFill);
    }
  }
`;
