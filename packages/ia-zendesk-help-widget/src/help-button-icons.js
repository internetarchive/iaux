import { html } from 'lit-element';

export default html`
  <svg
    class="icon-question-mark"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="fill-color" fill-rule="nonzero">
      <path d="m10.7078125 12.8359375v-.4140625c0-.765625.2890625-1.1484375 1.328125-1.75 1.1015625-.6484375 1.671875-1.46875 1.671875-2.6484375 0-1.78125-1.4765625-3.0234375-3.7109375-3.0234375-2.3984375 0-3.7578125 1.34375-3.796875 3.265625h2.1171875c.046875-.8828125.640625-1.453125 1.5390625-1.453125.890625 0 1.484375.5390625 1.484375 1.28125s-.3046875 1.125-1.3125 1.7265625c-1.078125.6328125-1.5078125 1.3359375-1.40625 2.5625l.015625.453125zm-1.0078125 3.734375c.7109375 0 1.28125-.5390625 1.28125-1.2265625s-.5703125-1.2265625-1.28125-1.2265625c-.703125 0-1.2734375.5390625-1.2734375 1.2265625s.5703125 1.2265625 1.2734375 1.2265625z"/><path d="m10 0c-5.5228475 0-10 4.4771525-10 10s4.4771525 10 10 10 10-4.4771525 10-10-4.4771525-10-10-10zm0 2c4.418278 0 8 3.581722 8 8s-3.581722 8-8 8-8-3.581722-8-8 3.581722-8 8-8z"/>
    </g>
  </svg>

  <svg
    class="icon-loading-spinner hidden"
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width="20px"
    height="20px"
    viewBox="0 0 128 128"
  >
    <g>
      <circle cx="16" cy="64" r="16" class="fill-color" fill-opacity="1"/>
      <circle cx="16" cy="64" r="14.344" class="fill-color" fill-opacity="1" transform="rotate(45 64 64)"/>
      <circle cx="16" cy="64" r="12.531" class="fill-color" fill-opacity="1" transform="rotate(90 64 64)"/>
      <circle cx="16" cy="64" r="10.75" class="fill-color" fill-opacity="1" transform="rotate(135 64 64)"/>
      <circle cx="16" cy="64" r="10.063" class="fill-color" fill-opacity="1" transform="rotate(180 64 64)"/>
      <circle cx="16" cy="64" r="8.063" class="fill-color" fill-opacity="1" transform="rotate(225 64 64)"/>
      <circle cx="16" cy="64" r="6.438" class="fill-color" fill-opacity="1" transform="rotate(270 64 64)"/>
      <circle cx="16" cy="64" r="5.375" class="fill-color" fill-opacity="1" transform="rotate(315 64 64)"/>
      <animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite"/>
    </g>
  </svg>
`;
