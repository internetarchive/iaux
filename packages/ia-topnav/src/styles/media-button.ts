import { css } from 'lit';

export default css`
  a {
    display: inline-block;
    text-decoration: none;
  }

  .menu-item {
    display: inline-block;
    width: 100%;
    padding: 0;
    font-size: 1.6rem;
    text-align: left;
    background: transparent;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .menu-item:focus {
    outline: none;
  }

  .label {
    display: inline-block;
    padding: 0;
    font-weight: 400;
    color: var(--primaryTextColor);
    text-align: left;
    vertical-align: middle;
  }

  .menu-item > .icon {
    display: inline-flex;
    vertical-align: middle;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .menu-item > .icon > svg {
    height: 4rem;
    width: 4rem;
  }

  .menu-item.selected .icon {
    background-color: var(--activeButtonBg);
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

  @media (min-width: 890px) {
    .menu-item {
      width: auto;
      height: 5rem;
      color: var(--mediaLabelDesktopColor);
      display: inline-flex;
    }
    .menu-item:hover,
    .menu-item:active,
    .menu-item:focus {
      color: var(--linkHoverColor);
    }

    .menu-item:hover .fill-color,
    .menu-item:active .fill-color,
    .menu-item:focus .fill-color {
      fill: var(--linkHoverColor);
    }

    .label {
      display: none;
    }

    .label,
    .web:after {
      padding-right: 1rem;
      font-size: 1.3rem;
      text-transform: uppercase;
      color: inherit;
    }

    .web:after {
      display: none;
      content: 'web';
    }
    .donate,
    .more {
      display: none;
    }

    .menu-item.selected {
      background: var(--activeDesktopMenuIcon);
    }

    .menu-item.selected .label,
    .menu-item.selected.web:after {
      color: var(--linkHoverColor);
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

  @media (min-width: 1200px) {
    .label,
    .web:after {
      display: inline;
    }

    .web .label {
      display: none;
    }
  }
`;
