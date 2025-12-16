export default class KeyboardNavigation {
  elementsContainer: HTMLElement;
  menuOption: string;
  focusableElements: HTMLElement[];
  focusedIndex: number;

  /**
   * Constructor for the KeyboardNavigation class.
   * @param {HTMLElement} elementsContainer - The container element that holds the focusable elements.
   * @param {string} menuOption - The type of menu option ('web' or 'usermenu').
   */
  constructor(elementsContainer: HTMLElement, menuOption: string) {
    this.elementsContainer = elementsContainer;
    this.menuOption = menuOption;
    this.focusableElements = this.getFocusableElements();
    this.focusedIndex = 0; // always start from first element

    if (menuOption !== 'search') {
      this.focusableElements[this.focusedIndex]?.focus();
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Gets an array of focusable elements within the container.
   * @returns {HTMLElement[]} An array of focusable elements.
   */
  getFocusableElements(): HTMLElement[] {
    const focusableTagSelectors = 'a[href], button, input, [tabindex]';

    const isFocusable = (el: Element) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('aria-hidden') !== 'true' &&
      el.getAttribute('tabindex') !== '-1';

    let elements;
    if (this.menuOption === 'web') {
      // wayback focusable elements
      const waybackSlider =
        this.elementsContainer.querySelector('wayback-slider')?.shadowRoot;
      const waybackSearch = waybackSlider?.querySelector('wayback-search');
      const waybackSearchElements = Array.from(
        waybackSearch?.shadowRoot?.querySelectorAll(focusableTagSelectors) ??
          [],
      );

      const normalElements = Array.from(
        waybackSlider?.querySelectorAll(focusableTagSelectors) ?? [],
      );

      // wayback save-form focusable elements
      const savePageForm = waybackSlider?.querySelector('save-page-form');
      const savePageFormElements = Array.from(
        savePageForm?.shadowRoot?.querySelectorAll(focusableTagSelectors) ?? [],
      );

      elements = [
        ...waybackSearchElements,
        ...normalElements,
        ...savePageFormElements,
      ];
    } else {
      elements = this.elementsContainer.querySelectorAll(focusableTagSelectors);
    }

    return Array.from(elements ?? []).filter(isFocusable) as HTMLElement[];
  }

  /**
   * Handles keyboard events and focuses the appropriate element.
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    const isArrowKey = [
      'ArrowDown',
      'ArrowRight',
      'ArrowUp',
      'ArrowLeft',
    ].includes(key);
    const isTabKey = key === 'Tab';

    if (isArrowKey) {
      this.handleArrowKey(key);
      event.preventDefault();
    } else if (isTabKey) {
      this.handleTabKey(event);
    }
  }

  /**
   * Handles arrow key events and focuses the next or previous element for topnav sub-nav and usermenu
   * @param {string} key - The key that was pressed ('ArrowDown', 'ArrowRight', 'ArrowUp', or 'ArrowLeft').
   */
  handleArrowKey(key: string) {
    const isDownOrRight = ['ArrowDown', 'ArrowRight'].includes(key);
    if (isDownOrRight) {
      this.focusNext();
    } else {
      this.focusPrevious();
    }
  }

  /**
   * Handles the Tab key event and focuses the next or previous menu item.
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  handleTabKey(event: KeyboardEvent) {
    const isShiftPressed = event.shiftKey;

    this.emitFocusToOtherMenuItems(isShiftPressed);

    this.focusableElements[this.focusedIndex]?.blur();
    if (!['search'].includes(this.menuOption)) {
      event.preventDefault();
    }
  }

  /**
   * Focuses the previous focusable element in the container.
   */
  focusPrevious() {
    if (this.focusableElements.length === 0) return;
    this.focusedIndex =
      (this.focusedIndex - 1 + this.focusableElements.length) %
      this.focusableElements.length;
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
   * Focuses the other parent menu items based on the provided flag.
   * @param {boolean} isPrevious - A flag indicating whether to focus the previous menu item.
   */
  emitFocusToOtherMenuItems(isPrevious: boolean = false) {
    this.elementsContainer.dispatchEvent(
      new CustomEvent('focusToOtherMenuItem', {
        bubbles: true,
        composed: true,
        detail: {
          mediatype: this.menuOption,
          moveTo: isPrevious ? 'prev' : 'next',
        },
      }),
    );
  }
}
