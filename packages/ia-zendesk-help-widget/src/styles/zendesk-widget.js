import { css } from 'lit-element';

export default css`
  .help-widget {
    padding: 13px 22px;
    margin: 14px 20px;
    position: fixed;
    bottom: 0px;
    z-index: 999998;
    transition-duration: 250ms;
    right: 0px;
    background: #194880;
    color: #FFFFFF;
    letter-spacing: 0.6px;
    font-size: inherit;
    transition: opacity 0.12s linear;
    border-radius: 999rem;
    border: 0;
    outline: none;
    font-weight: 700;
    cursor: pointer;
    vertical-align: middle;
  }

  .help-widget svg {
    vertical-align: middle;
    margin-right: 3px;
  }

  @media (max-width: 767px) {
    .hidden-sm {
      display:none;
    }

    .help-widget {
      padding: 13px 13px;
    }

    .help-widget svg {
      margin-right: 0;
    }
  }
`;
