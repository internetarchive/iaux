import { html, css, LitElement, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { animate } from '@lit-labs/motion';
import {
  date,
  mediaTypeOption,
  months,
  searchFieldCondition,
  searchFieldOption,
  years,
} from '../core/config/dropdown-fields';
import iauxSearchWidgetCss from '../style/css/iaux-search-widget.css';

@customElement('iaux-search-widget')
export class IauxSearchWidget extends LitElement {
  @property({ type: String }) queryParam = '';

  @property({ type: String }) heading = 'Advanced Search Query';

  @property({ type: String }) searchQuery: string = '';

  @property({ type: Array }) parasedQuery: string[] = [];

  // dropdown properties
  @property({ type: Array }) year = years;

  @property({ type: Array }) months = months;

  @property({ type: Array }) date = date;

  @property({ type: Array }) searchField = searchFieldOption;

  @property({ type: Array }) searchCondition = searchFieldCondition;

  @property({ type: Array }) open = false;

  @property({ type: HTMLDivElement })
  searchContainer!: HTMLDivElement;

  @property({ type: Array }) mediaTypeOption = mediaTypeOption;

  firstUpdated() {
    this.searchContainer = this.shadowRoot?.getElementById(
      'search-field-container'
    ) as HTMLDivElement;
    // set dropdown values to properties
    this.parasedQuery = [];
    this.searchQuery = this.queryParam;

    this.getKeyValue();
  }

  updated(changed: PropertyValues): void {
    if (changed) {
      this.searchQuery = this.queryParam;
    }
  }

  formSubmit() {
    this.setSearchQuery();
    if (!this.parasedQuery.length) return;

    const queryParam = encodeURIComponent(this.searchQuery);
    window.location.href = `?query=${queryParam}`;
  }

  /**
   * to Delete field from html and from search input box
   * @param field | fields
   */
  deleteSearchField(field: HTMLElement) {
    field.remove();
  }

  /**
   * function render fields according to url
   */
  getKeyValue() {
    if (!this.queryParam || this.queryParam.length === 0) {
      this.addSearchField();
      return;
    }
    const arr = this.queryParam.split(/AND|OR/);

    arr.forEach(data => {
      const str = data.split(':');
      let key: string = str[0]?.trim();
      const isNegated: string = key[0] === '-' ? 'false' : 'true';
      key = key.replace('-', '');
      const value = str[1]?.trim().replace(/[[\]"'()/]/g, '');

      if (str.length === 2 && this.searchField.includes(key)) {
        if (key === 'date') {
          if (/TO/.test(value)) {
            // console.log(value);
            this.addDateRangeSearchField(value);
          } else {
            this.addDateSearchField(value);
          }
        } else {
          this.addSearchField(key, isNegated, value);
        }
      } else {
        this.setParasedQueryString(`(${key})`);
        this.addSearchField();
      }
    });
  }

  /**
   * function for set value of fields
   */
  setSearchQuery() {
    let searchQToShow;
    this.parasedQuery.length = 0;

    const selectFields =
      this.searchContainer!.querySelectorAll('.search-fields');
    selectFields.forEach(element => {
      const selectField = (
        element.querySelector('div .select-field') as HTMLInputElement
      ).value;
      const selectValue: string = (
        element.querySelector('div .select-value') as HTMLInputElement
      )?.value;

      if (
        selectField !== 'none' ||
        (selectValue !== '' && selectValue !== 'none')
      ) {
        if (selectField === 'date') {
          const yearValue = (
            element.querySelector('div .select-year') as HTMLInputElement
          ).value;
          const monthValue = (
            element.querySelector('div .select-month') as HTMLInputElement
          ).value;
          const dateValue = (
            element.querySelector('div .select-date') as HTMLInputElement
          ).value;

          if ([yearValue, monthValue, dateValue].includes('none')) return null;

          searchQToShow = `date:${yearValue}-${monthValue}-${dateValue}`;
        } else if (selectField === 'date range') {
          const yearFrom = (
            element.querySelector('div .select-year-from') as HTMLInputElement
          ).value;
          const monthFrom = (
            element.querySelector('div .select-month-from') as HTMLInputElement
          ).value;
          const dateFrom = (
            element.querySelector('div .select-date-from') as HTMLInputElement
          ).value;
          const yearTo = (
            element.querySelector('div .select-year-to') as HTMLInputElement
          ).value;
          const monthTo = (
            element.querySelector('div .select-month-to') as HTMLInputElement
          ).value;
          const dateTo = (
            element.querySelector('div .select-date-to') as HTMLInputElement
          ).value;

          if (
            [yearFrom, monthFrom, dateFrom, yearTo, monthTo, dateTo].includes(
              'none'
            )
          )
            return null;

          searchQToShow = `date:[${yearFrom}-${monthFrom}-${dateFrom} TO ${yearTo}-${monthTo}-${dateTo}]`;
        } else {
          if (selectValue.includes('none') || selectValue === '') return '';
          const selectCondition = (
            element.querySelector('.select-condition') as HTMLInputElement
          ).value;

          searchQToShow = `${
            selectCondition === 'false' ? `-${selectField}` : selectField
          }:(${selectValue})`;
        }
        this.setParasedQueryString(searchQToShow);
      }
      return true;
    });
  }

  /**
   * To join with 'AND'
   * @param {string} value - search value
   */
  setParasedQueryString(value: string) {
    this.parasedQuery.push(value);
    this.searchQuery = this.parasedQuery.join(' AND ');
  }

  /**
   * To append options in select Field select box
   * @param {string} key - select option if key has value
   * @param {string[]} fields - select option if key has value
   * @returns {HTMLOptionElement}
   */
  getOption(fields: String[], key?: string) {
    return fields.map(
      item =>
        `<option value="${item}" ${
          key === item ? 'selected' : ''
        }>${item}</option>`
    );
  }

  /**
   * To append options in condition select box
   * @param {string} isNegated - select option if keyword has value
   * @returns {HTMLOptionElement}
   */
  getSearchCondition(isNegated?: string) {
    return `<select class="select-condition">${this.searchCondition.map(
      item =>
        `<option value="${item[1]}" ${
          item[1] === isNegated ? 'selected' : ''
        }>${item[0]}</option>`
    )}</select>`;
  }

  /**
   * add new fields or mediaType files
   * @param {string} key - select field value
   * @param {string} isNegated - select condition field contain/is not contain
   * @param {string} value - input field text
   * @returns {HTMLElement}
   */
  addSearchField(
    key?: string,
    isNegated?: string,
    value?: string
  ): HTMLElement {
    const field = document.createElement('div');
    field.classList.add('search-fields');
    field.classList.add('flex');

    let inputFieldType = '';
    if (key === 'mediatype') {
      inputFieldType = `<select class="select-value">
      <option value = 'none'>Select MediaType</option>${this.getOption(
        this.mediaTypeOption,
        value
      )}</select>`;
    } else {
      inputFieldType = `
      <input 
        type="text" 
        class="select-value" 
        value="${value || ''}" 
        placeholder="Please enter search query"
       />`;
    }

    field.innerHTML = `<div>
        <select class="select-field" >
        ${this.getOption(this.searchField, key)}
        </select>
        ${this.getSearchCondition(isNegated)}
        ${inputFieldType}
      </div>
      ${this.actionButton}
    `;

    // to add onChange Evnents
    this.searchContainer?.appendChild(field);

    // console.log(field)
    this.setEventListeners(field);
    return field;
  }

  /**
   * add date fields
   * @param {string} value - contain year-month-date
   */
  addDateSearchField(value: String = '') {
    const splitValue = value.split('-');
    const key = 'date';
    const field = document.createElement('div');
    field.classList.add('search-fields');
    field.classList.add('flex');

    field.innerHTML = `<div>
      <select class="select-field" >
        ${this.getOption(this.searchField, key)}
      </select>
      <select class="select-year" id="year" name="year">
        <option value="none">year</option>
        ${this.getOption(this.year, splitValue[0]?.trim())}
      </select>
      <select class="select-month" id="month" name="month">
        <option value="none">month</option>
        ${this.getOption(this.months, splitValue[1]?.trim())}
      </select>
      <select class="select-date" id="date" name="date">
        <option value="none">date</option>
        ${this.getOption(this.date, splitValue[2]?.trim())}
      </select>
      </div>
      ${this.actionButton}
    `;
    this.searchContainer?.appendChild(field);

    // to add onChange Evnents
    this.setEventListeners(field);
    return field;
  }

  /**
   * to append app and delete button
   * @returns {HTMLElement}
   */
  get actionButton() {
    return `
      <div>
        <button class="add-field">&#43;</button>
        <button class="delete-field">Delete</button>
      </div>
    `;
  }

  /**
   * add date search field with range
   * @param {string} value - contain date range
   * @returns {HTMLElement}
   */
  addDateRangeSearchField(value: String = ''): HTMLElement {
    const [from, to] = value.split('TO');
    const key = 'date range';
    const field = document.createElement('div');
    field.classList.add('search-fields');
    field.classList.add('flex');

    let yearFrom;
    let monthFrom;
    let dateFrom = '';
    let yearTo;
    let monthTo;
    let dateTo = '';

    if (from !== '') {
      const dateFromAt = from.split('-');
      const dateToAt = to.split('-');
      [yearFrom, monthFrom, dateFrom] = [
        dateFromAt[0],
        dateFromAt[1],
        dateFromAt[2],
      ];
      [yearTo, monthTo, dateTo] = [dateToAt[0], dateToAt[1], dateToAt[2]];
    }

    field.innerHTML = `<div class="range">
      <select class="select-field" >
        ${this.getOption(this.searchField, key)}
      </select>
      <div>
        <div class="flex">
          <h4>FROM</h4>
          <select class="select-year-from" id="yearFrom" name="yearFrom">
          <option value="none">year</option>
            ${this.getOption(this.year, yearFrom?.trim())}
          </select>
          <select class="select-month-from" id="monthFrom" name="monthFrom">
            <option value="none">month</option>
            ${this.getOption(this.months, monthFrom?.trim())}
          </select>
          <select class="select-date-from" id="dateFrom" name="dateFrom">
            <option value="none">date</option>
            ${this.getOption(this.date, dateFrom?.trim())}
          </select>
        </div>
        <div class="flex">
          <h4>TO</h4>
          <select class="select-year-to" id="yearTo" name="yearTo">
            <option value="none">year</option>
            ${this.getOption(this.year, yearTo?.trim())}
          </select>
          <select class="select-month-to" id="monthTos" name="monthTos">
            <option value="none">month</option>
            ${this.getOption(this.months, monthTo?.trim())}
          </select>
          <select class="select-date-to" id="dateTo" name="dateTo">
            <option value="none">date</option>
            ${this.getOption(this.date, dateTo?.trim())}
          </select>
        </div>
      </div>
    </div>
    ${this.actionButton}
    `;
    this.searchContainer?.appendChild(field);

    // to add  Evnents
    this.setEventListeners(field);
    return field;
  }

  /**
   * to add event onChange | onClick
   * @param field - add on change events
   */
  setEventListeners(field: HTMLElement) {
    field.querySelector('.select-field')?.addEventListener('change', () => {
      const selectFieldValue = (
        field.querySelector('.select-field') as HTMLInputElement
      ).value;
      // this.finalsearchField =  Object.keys(this.searchField).filter(key => this.searchField[key] === true);

      if (selectFieldValue === 'date') {
        this.deleteSearchField(field);
        this.addDateSearchField();
      } else if (selectFieldValue === 'date range') {
        this.deleteSearchField(field);
        this.addDateRangeSearchField();
      } else if (selectFieldValue === 'mediatype') {
        this.deleteSearchField(field);
        this.addSearchField(selectFieldValue);
      } else {
        this.deleteSearchField(field);
        this.addSearchField(selectFieldValue);
      }
    });

    field.querySelector('.delete-field')?.addEventListener('click', () => {
      this.deleteSearchField(field);
    });

    field.querySelector('.add-field')?.addEventListener('click', () => {
      this.addSearchField();
    });
  }

  render() {
    return html` <div
      class="search-main ${this.open ? 'anim' : ''}"
      ${animate()}
    >
      <h3>${this.queryParam}</h3>
      <div id="search-field-container">
        <h2>Select Fields</h2>
      </div>
      <div class="btn-section">
        <button class="cancel-btn">Cancel</button>
        <button id="apply-btn" @click="${this.formSubmit}">Apply</button>
      </div>
    </div>`;
  }

  static styles = css`
    ${iauxSearchWidgetCss}
  `;
}
