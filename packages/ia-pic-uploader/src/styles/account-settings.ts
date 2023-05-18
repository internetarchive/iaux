import { css } from 'lit';

export const AccountSettings = css`
  .authentication-template a {
    display: inherit;
    margin-top: 5px;
  }
  .settings-template {
    display: flex;
  }
  .container {
    display: grid;
    justify-content: center;
    flex-direction: column;
  }

  .header {
    display: flex;
    align-items: center;
  }
  .header h2 {
    margin-right: 10px;
  }
  button {
    user-select: none;
  }
  a {
    color: #3a92b7;
  }
  button,
  input[type='submit'],
  .delete-button {
    margin-right: 5px;
    background: #000;
    border: 1px solid gray;
    color: white;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    min-height: 3.7rem;
    // width: 110px;
  }
  .header button:disabled {
    background: #8ca3bf;
    cursor: auto;
  }

  .select-message {
    line-height: 18px;
  }
  input[type='text'],
  input[type='email'],
  input[type='password'] {
    display: block;
    width: 60%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s,
      box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  .newsletter p {
    margin-top: 0;
  }
  .form-element {
    margin-bottom: 15px;
  }
  .form-element label:first-child {
    display: block;
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 5px;
  }
  .form-element label {
    font-weight: normal;
  }
  .form-element label small {
    font-weight: normal;
  }
  input[type='checkbox'],
  input[type='radio'] {
    vertical-align: baseline;
    margin-left: 0px;
  }

  .admin-functions ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  .admin-functions ul li {
    padding: 5px 0;
  }

  .delete-link a {
    margin-top: 10px;
    text-decoration: none;
  }
  .delete-link:hover {
    text-decoration: underline;
  }

  .error-field {
    color: #bb0505;
    margin: 3px 0px;
    font-size: 1.2rem;
  }

  #upload-region {
    margin-top: 5px;
    display: inherit;
  }

  .btn-disabled {
  }

  iaux-pic-uploader label {
    display: block;
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 5px;
  }

  #save-button::before {
    content: 'Save Changes';
    display: block;
    height: 0;
    min-width: 35px;
    visibility: hidden;
    speak: none;
  }

  ia-activity-indicator {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    color: white;
    --activityIndicatorLoadingRingColor: #fff;
    --activityIndicatorLoadingDotColor: #fff;
  }

  .pointer-none {
    opacity: 0.8;
    pointer-events: none;
  }

  .delete-account {
    border: 2px solid #bb0505;
    padding: 10px;
    margin-left: -10px;
  }

  .delete-account a {
    font-weight: normal;
    display: inherit;
  }

  .hide {
    display: none;
  }

  .delete-button {
    background: #bb0505;
    margin-top: 0;
  }

  .delete-button:disabled {
    background: #c75e5e;
    pointer-events: none;
  }
`;
