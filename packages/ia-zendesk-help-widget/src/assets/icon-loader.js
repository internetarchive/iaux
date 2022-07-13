import { html } from 'lit';

export default html`
  <svg
    class="icon-loader"
    height="20"
    viewBox="0 0 128 128"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
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
