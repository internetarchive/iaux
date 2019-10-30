export default class QuickSearchEntry {
  displayText = '';

  data: object = {};

  constructor(displayText: string, data: object = {}) {
    this.displayText = displayText;
    this.data = data;
  }
}
