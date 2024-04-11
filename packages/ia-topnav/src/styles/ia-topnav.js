import { css } from 'https://offshoot.prod.archive.org/lit.js';

export default css`
  :host {
    --white: #fff;
    --grey13: #222;
    --grey20: #333;
    --grey40: #666;
    --grey28: #474747;
    --grey60: #999;
    --grey66: #aaa;
    --grey80: #ccc;
    --errorYellow: #ffcd27;

    --linkColor: #428bca;
    --linkHoverColor: var(--white);
    --subnavLinkColor: var(--grey66);
    --primaryTextColor: var(--white);
    --inverseTextColor: var(--grey20);
    --lightTextColor: var(--grey60);
    --activeColor: var(--white);
    --activeButtonBg: var(--grey20);
    --iconFill: var(--grey60);

    --searchActiveBg: var(--grey20);
    --searchActiveInputBg: var(--white);
    --searchMenuBg: var(--grey20);
    --desktopSearchIconFill: var(--grey20);

    --mediaMenuBg: var(--grey13);
    --mediaLabelDesktopColor: var(--grey60);
    --activeDesktopMenuIcon: var(--grey28);

    --mediaSliderBg: var(--grey20);
    --mediaSliderDesktopBg: var(--grey28);

    --primaryNavBg: var(--grey13);
    --primaryNavBottomBorder: var(--grey20);

    --desktopSubnavBg: var(--grey20);

    --dropdownMenuBg: var(--grey20);
    --dropdownMenuInfoItem: var(--grey60);
    --dropdownMenuDivider: var(--grey40);

    --loginTextColor: var(--grey60);

    --themeFontFamily: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    --logoWidthTablet: 263px;

    --savePageSubmitBg: var(--grey13);
    --savePageSubmitText: var(--white);
    --savePageInputBorder: var(--grey60);
    --savePageErrorText: var(--errorYellow);

    color: var(--primaryTextColor);
    font-family: var(--themeFontFamily);
  }

  primary-nav:focus {
    outline: none !important;
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
    z-index: 3;
  }

  @media (max-width: 889px) {
    desktop-subnav {
      display: none;
    }
  }
`;
