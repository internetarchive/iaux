import { css } from 'lit-element';

export default css`
  .help-widget {
    width: 108px;
    height: 45px;
    padding: 0px;
    margin: 14px 20px;
    position: fixed;
    bottom: 0px;
    z-index: 999998;
    transition-duration: 250ms;
    right: 0px;
    background: #194880;
    color: #FFFFFF;
    letter-spacing: 0.6;
    font-size: 1.07143rem;
    transition: opacity 0.12s linear;
    border-radius: 999rem;
    border: 0;
    outline: none;
    font-weight: 700;
  }

  .help-widget svg {
    vertical-align: middle;
  }
`;
