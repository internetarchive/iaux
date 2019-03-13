import React from 'react';

export default props => (
  <figure {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="25"
      viewBox="0 0 175 120"
      aria-labelledby="youtube-logo"
      role="img"
    >
      <title id="youtube-logo">YouTube logo</title>
      <defs>
        <polygon id="official-youtube-red-a" points=".06 .04 176 .04 176 124 .06 124" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="official-youtube-red-b" fill="#fff">
          <use xlinkHref="#official-youtube-red-a" />
        </mask>
        <path fill="#D9252A" d="M172.322,19.363 C170.298,11.741 164.335,5.739 156.762,3.702 C143.037,0 88,0 88,0 C88,0 32.963,0 19.238,3.702 C11.666,5.739 5.702,11.741 3.678,19.363 C0,33.177 0,62 0,62 C0,62 0,90.822 3.678,104.638 C5.702,112.259 11.666,118.261 19.238,120.299 C32.963,124 88,124 88,124 C88,124 143.037,124 156.762,120.299 C164.335,118.261 170.298,112.259 172.322,104.638 C176,90.822 176,62 176,62 C176,62 176,33.177 172.322,19.363" mask="url(#official-youtube-red-b)" />
        <polyline fill="#FFFFFE" points="70 88.169 116 62.001 70 35.831 70 88.169" />
      </g>
    </svg>
  </figure>
);
