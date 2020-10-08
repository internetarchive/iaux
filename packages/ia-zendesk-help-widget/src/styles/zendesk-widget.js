import { css } from 'lit-element';

export default css`
  :host {
    --buttonBlue: #194880;
    --white: #fff;

    --iconFillColor: var(--white);
    --linkColor: var(--white);
  }

  .help-widget {
    width: 108px;
    height: 46px;
    margin: 14px 20px;
    position: fixed;
    bottom: 0px;
    z-index: 999998;
    transition-duration: 250ms;
    right: 0px;
    background: var(--buttonBlue);
    color: var(--linkColor);
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

  .fill-color {
    fill: var(--iconFillColor);
  }

  .help-widget svg {
    vertical-align: middle;
    margin-right: 3px;
  }

  .hidden {
    opacity: 0;
    display: none;
    visibility: hidden;
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
