import { css } from 'lit';

/* these variable being used for full version */
const imgMaxHeight = css`var(--imgMaxHeight, 100px)`;
const imgMaxwidth = css`var(--imgMaxWidth, 200px)`;

export default css`
  :host {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: inline-block;
  }

  :host *:focus,
  :host *:focus-visible {
    outline: none;
  }

  a,
  a:hover,
  a:focus {
    color: #4b64ff;
  }

  .profile-section,
  .select-region {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    font-size: 1.4rem;
  }

  .profile-section {
    border-radius: 100%;
    width: fit-content;
    line-height: normal;
    height: fit-content;
    margin-right: 1rem;
  }

  .adjust-full {
    width: fit-content;
  }

  .profile-section > .full-preview img {
    max-height: ${imgMaxHeight};
    max-width: ${imgMaxwidth};
  }

  .profile-section:hover .overlay {
    display: block;
    z-index: 1;
  }

  .show-overlay {
    display: block !important;
    z-index: 1;
    background: none !important;
  }

  .show-overlay + .image-preview img {
    box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
    opacity: 0.2;
  }

  .profile-hover:hover .self-submit-form {
    display: block;
  }

  .image-preview {
    border-radius: 100%;
  }

  .image-preview img {
    height: 120px;
    width: 120px;
    max-height: 120px;
    max-width: 120px;
    background-size: cover;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    position: relative;
    overflow: hidden;
  }

  .overlay:hover + .image-preview img,
  .overlay.window-drag-over + .image-preview img,
  .image-preview:hover img {
    box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
    opacity: 0.5;
    cursor: pointer;
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    text-align: center;
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
    display: none;
    padding: 5px;
    min-width: 16px;
    line-height: 1.5rem;
  }

  .full-preview img {
    cursor: default;
    width: auto;
    height: 100%;
    border-radius: 0% !important;
  }

  .vertical-center {
    top: 10px !important;
  }

  .self-submit-form {
    box-sizing: border-box;
    background: white;
    border: 3px solid #ccc;
    border-radius: 10px;
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 200px;
    padding: 11px;
    text-align: center;
    justify-content: center;
    z-index: 3;
    justify-items: center;
  }

  @media (max-width: 1350px) {
    .self-submit-form {
      left: 100%;
    }
  }

  .plus-icon {
    pointer-events: none;
  }

  .self-submit-form .full-preview img {
    height: auto;
  }

  .close-button {
    position: absolute;
    right: 5px;
    top: 5px;
    padding: 5px;
    border: none;
    font-size: 1rem;
    background: white;
  }
  .close-button:hover {
    cursor: pointer;
  }

  .self-submit-form.drag-over {
    border: 3px dashed #ccc;
  }

  .self-submit-form .drag-text {
    font-weight: bold;
    font-size: 1.2rem;
    cursor: default;
    color: #000;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .window-drag-over {
    display: block;
    z-index: 1;
  }

  .hidden {
    display: none;
  }

  .pointer-none {
    pointer-events: none;
  }

  #file-picker {
    margin: 2px auto;
    padding: 0 1rem;
  }

  #file-submit {
    padding: 0 1rem;
    margin: 4px auto;
    background-color: #5cb85c;
    justify-content: center;
    width: 8rem;
    border-color: #4cae4c;
  }

  #upload-region {
    text-decoration: underline;
  }
  #upload-region:hover {
    cursor: pointer;
  }

  #file-submit:hover {
    background-color: #47a447;
    border-color: #398439;
  }

  .error {
    margin: 3px 0px;
    font-size: 1.2rem;
    color: #bb0505;
    overflow: hidden;
    word-wrap: unset;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .self-submit-form ia-activity-indicator {
    display: inline-block;
    width: 20px;
    color: white;
    margin-top: 2px;
    --activityIndicatorLoadingRingColor: #000;
    --activityIndicatorLoadingDotColor: #000;
  }

  .show-overlay ia-activity-indicator {
    display: inline-block;
    width: 25px;
    color: white;
    margin-top: 2px;
    --activityIndicatorLoadingRingColor: #000;
    --activityIndicatorLoadingDotColor: #000;
  }
`;
