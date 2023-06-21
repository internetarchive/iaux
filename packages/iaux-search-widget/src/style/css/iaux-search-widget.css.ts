import { css } from 'lit';

export default css`
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
  input[type='text'],
  input[type='password'],
  input[type='checkbox'],
  select {
    padding: 10px 5px;
    margin: 5px;
    display: inline-block;
    border: none;
    background: #f1f1f1;
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

  .anim {
    opacity: 1;
    top: 20px;
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
