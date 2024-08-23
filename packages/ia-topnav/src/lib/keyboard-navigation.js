export default class KeyboardNavigation {
  /**
   * Constructor for the KeyboardNavigation class.
   * @param {HTMLElement} elementsContainer - The container element that holds the focusable elements.
   * @param {string} menuOption - The type of menu option ('web' or 'usermenu').
   */
  constructor(elementsContainer, menuOption) {
    this.elementsContainer = elementsContainer;
    this.menuOption = menuOption;
    this.focusableElements = this.getFocusableElements();
    this.focusedIndex = this.getInitialFocusedIndex();

    this.focusableElements[this.focusedIndex]?.focus();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Returns the initial focused index based on the menu option.
   * @returns {number} The initial focused index (0 for 'web', 1 for 'usermenu').
   */
  getInitialFocusedIndex() {
    return this.menuOption === 'usermenu' ? 1 : 0;
  }

  /**
   * Gets an array of focusable elements within the container.
   * @returns {HTMLElement[]} An array of focusable elements.
   */
  getFocusableElements() {
    const focusableTagSelectors = 'a[href], button, input, [tabindex]:not([tabindex="-1"])';
    const isDisabledOrHidden = el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden');

    let elements;
    if (this.menuOption === 'web') {
      // wayback focusable elements
      const waybackSlider = this.elementsContainer.querySelector('wayback-slider').shadowRoot;
      const waybackSearch = waybackSlider.querySelector('wayback-search');
      const waybackSearchElements = Array.from(waybackSearch.shadowRoot.querySelectorAll(focusableTagSelectors));

      const normalElements = Array.from(waybackSlider.querySelectorAll(focusableTagSelectors));

      // wayback save-form focusable elements
      const savePageForm = waybackSlider.querySelector('save-page-form');
      const savePageFormElements = Array.from(savePageForm.shadowRoot.querySelectorAll(focusableTagSelectors));

      elements = [...waybackSearchElements, ...normalElements, ...savePageFormElements];
    } else {
      elements = this.elementsContainer.querySelectorAll(focusableTagSelectors);
    }

    return Array.from(elements).filter(isDisabledOrHidden);
  }

  /**
   * Handles keyboard events and focuses the appropriate element.
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  handleKeyDown(event) {
    const { key } = event;
    const isArrowKey = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(key);
    const isTabKey = key === 'Tab';

    if (isArrowKey) {
      this.handleArrowKey(key);
      event.preventDefault();
    } else if (isTabKey) {
      this.handleTabKey(event);
    }
  }

  /**
   * Handles arrow key events and focuses the next or previous element.
   * @param {string} key - The key that was pressed ('ArrowDown', 'ArrowRight', 'ArrowUp', or 'ArrowLeft').
   */
  handleArrowKey(key) {
    const isDownOrRight = ['ArrowDown', 'ArrowRight'].includes(key);
    isDownOrRight ? this.focusNext() : this.focusPrevious();
  }

  /**
   * Focuses the previous focusable element in the container.
   */
  focusPrevious() {
    if (this.focusableElements.length === 0) return;
    this.focusedIndex = (this.focusedIndex - 1 + this.focusableElements.length) % this.focusableElements.length;
    this.focusableElements[this.focusedIndex]?.focus();
  }

  /**
   * Focuses the next focusable element in the container.
   */
  focusNext() {
    if (this.focusableElements.length === 0) return;
    this.focusedIndex = (this.focusedIndex + 1) % this.focusableElements.length;
    this.focusableElements[this.focusedIndex]?.focus();
  }

  /**
   * Handles the Tab key event and focuses the next or previous menu item.
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  handleTabKey(event) {
    if (this.menuOption) {
      const isShiftPressed = event.shiftKey;
      this.focusNextMenuItem(isShiftPressed);
    }

    this.focusableElements[this.focusedIndex]?.blur();
    event.preventDefault();
  }

  /**
   * Focuses the next or previous menu item based on the provided flag.
   * @param {boolean} isPrevious - A flag indicating whether to focus the previous menu item.
   */
  focusNextMenuItem(isPrevious = false) {
    this.elementsContainer.dispatchEvent(
      new CustomEvent('focusToNext', {
        bubbles: true,
        composed: true,
        detail: {
          mediatype: this.menuOption,
          moveTo: isPrevious ? 'prev' : 'next',
        },
      })
    );
  }
}
