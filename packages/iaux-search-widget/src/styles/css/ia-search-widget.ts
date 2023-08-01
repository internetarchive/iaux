import { css } from 'lit';

export const iaSearchWidgetCss = css`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  #input-search {
    width: 79%;
  }

  #apply-btn {
    padding: 10px;
    background: #009cff;
    border: none;
    border-radius: 3px;
    color: #fff;
    margin: 5px;
  }

  .search-field .term,
  .search-field .condition {
    width: 20%;
  }

  .search-field .value {
    width: 40%;
  }

  .search-field .action {
    display: inline-block;
    width: 10%;
  }

  /* Full-width input fields */
  select {
    width: 24%;
  }
  input[type="text"], input[type="email"], input[type="password"] {
    width: 50%;
  }
  .form-field {
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857;
    background-color: rgb(255, 255, 255);
    background-image: none;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  }

  input[type='text']:focus,
  input[type='password']:focus {
    background-color: #ddd;
    outline: none;
  }

  hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
  }

  /* Set a style for all buttons */
  button {
    background-color: #04aa6d;
    color: white;
    padding: 10px;
    margin: 5px;
    border: none;
    cursor: pointer;
    opacity: 0.9;
  }

  .search-main {
    position: relative;
    box-sizing: border-box;
    padding: 25px;
    color: var(--iaux-search-widget-text-color, #000);
    width: 600px;
    margin: 0 auto;
    font-size: 12px;
    background: white;
    border-radius: 10px;
    opacity: 0;
    border: 2px solid #c2c2c2;
    display: none;
    box-shadow: #afafaf 4px 4px 15px;
  }

  .visible {
    opacity: 1;
    display: block;
  }

  button.cancel-btn {
    color: white;
    padding: 10px;
    margin: 5px;
    border: none;
    cursor: pointer;
    opacity: 0.9;
  }

  .btn-section {
    text-align: right;
  }

  button:hover {
    opacity: 1;
  }

  .search-fields {
    display: flex;
    justify-content: space-between;
  }

  .search-fields .range {
    display: flex;
    align-items: center;
  }

  .search-fields .range select {
    max-width: 90px;
  }

  .search-fields .range h3 {
    margin: 0;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .flex h4 {
    padding: 10px;
    width: 5rem;
    margin: auto 1rem;
  }
`;
