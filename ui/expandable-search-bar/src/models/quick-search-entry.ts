/**
 * A data model to define the quick search entries
 *
 * @export
 * @class QuickSearchEntry
 */
export default class QuickSearchEntry {
  displayText = '';

  data: object = {};

  /**
   * Creates an instance of QuickSearchEntry.
   *
   * @param {string} displayText
   * @param {object} [data={}] optional additional data to pass along with the entry
   * @memberof QuickSearchEntry
   */
  constructor(displayText: string, data: object = {}) {
    this.displayText = displayText;
    this.data = data;
  }
}
