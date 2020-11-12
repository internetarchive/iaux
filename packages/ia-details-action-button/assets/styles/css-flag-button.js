import { css } from 'lit-element';
import actionButtonCSS from '../styles/action-button';

export default css`
  ${actionButtonCSS}
  :host {
    --white: #fff;
    --textColor: #333;
    --lightRedBgColor: rgba(190, 16, 36, 0.29);
    --flagFillColor: rgb(208, 2, 27);

    --iconFillColor: var(--flagFillColor);
    --iconStrokeColor: var(--flagFillColor);
  }

  .flag-button:hover, .flag-button:focus {
    color: var(--flagFillColor);
    background-color: var(--lightRedBgColor);
    border: solid 1px var(--flagFillColor);
    fill: var(--iconFillColor);
  }

  .flagged button {
    background-color: var(--lightRedBgColor);
    color: var(--flagFillColor);
    fill: var(--iconFillColor);
    border: 1px solid var(--flagFillColor);
  }

  .flagged button path {
    fill: var(--iconFillColor);
  }

  a {
    pointer-events: none;
    cursor: pointer;
    padding: 10px 0px 10px 10px;
    color: var(--textColor);
    width: auto;
    display: block;
    font-size: 12px;
    font-family: 'Helvetica Neue';
  }

  .flagged-text a {
    color: rgb(208, 2, 27);
    background-color: rgb(246, 216, 222);
  }

  .flagged-text path {
    fill: var(--iconFillColor);
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
    list-style: none;
    border-bottom: 1px solid #f1f1f1;
  }
  .dropdown-menu {
    color: #d0021b;
    border: 2px solid #d0021b;
    width: 170px;
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
`;
