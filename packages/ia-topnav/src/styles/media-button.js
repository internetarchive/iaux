import { css } from 'lit-element';

export default css`
  a {
    display: inline-block;
    text-decoration: none;
  }

  button:focus {
    outline-color: var(--link-color);
    outline-width: 0.16rem;
    outline-style: auto;
  }

  .menu-item {
    width: 100%;
    background: transparent;
    font-size: 1.6rem;
    cursor: pointer;
    border: none;
    text-align: left;
    padding: 0;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .menu-item:focus {
    outline: none;
  }

  .label {
    display: inline-block;
    color: var(--white);
    text-align: left;
    vertical-align: middle;
  }

  .menu-item > .icon {
    display: inline-flex;
    width: 42px;
    height: 42px;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
  }

  .menu-item.selected .icon {
    background-color: var(--grey20);
    border-radius: 1rem 0 0 1rem;
  }

  .icon .fill-color {
    fill: #999;
  }

  .icon.active .fill-color {
    fill: #fff;
  }

  .donate .fill-color {
    fill: #f00;
  }

  @media (min-width: 768px) {
    .menu-item {
      width: auto;
      height: 5rem;
    }
    .label {
      display: none;
    }

    .label,
    .web:after {
      padding-right: 1rem;
      font-size: 1.3rem;
      text-transform: uppercase;
      color: var(--grey999);
    }

    .web:after {
      display: none;
      content: "web";
    }
    .donate,
    .more {
      display: none;
    }

    .menu-item.selected {
      background: var(--grey20);
    }

    .menu-item.selected .label,
    .menu-item.selected.web:after {
      color: var(--white);
    }

    .menu-item.selected .icon {
      background: transparent;
    }

    /* selected state icon colors */
    .web.selected .fill-color {
      fill: #ffcd27;
    }

    .texts.selected .fill-color {
      fill: #faab3c;
    }

    .video.selected .fill-color {
      fill: #f1644b;
    }

    .audio.selected .fill-color {
      fill: #00adef;
    }

    .software.selected .fill-color {
      fill: #9ecc4f;
    }

    .images.selected .fill-color {
      fill: #aa99c9;
    }
  }

  @media (min-width: 1300px) {
    .label,
    .web:after {
      display: inline;
    }

    .web .label {
      display: none;
    }
  }
`;
