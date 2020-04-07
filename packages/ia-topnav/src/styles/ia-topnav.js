import { css } from 'lit-element';

export default css`
  :host {
    --white: #fff;
    --grey13: #222;
    --grey20: #333;
    --grey28: #474747;
    --grey999: #999;
    --grey80: #ccc;
    --black: #000;
    --link-color: #428bca;
    --subnavLinkColor: #aaa;
    --primary-text-color: var(--white);

    --theme-font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    --logoWidthTablet: 263px;

    color: var(--primary-text-color);
    font-size: 2rem;
    font-family: var(--theme-font-family);
  }

  #close-layer {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  }
  #close-layer.visible {
    display: block;
  }

  .topnav {
    position: relative;
    z-index: 2;
  }
`;
