export interface FieldValidator {
  keydown(e: KeyboardEvent): void;
}

export class CurrencyValidator implements FieldValidator {
  keydown(e: KeyboardEvent) {
    const char = e.key;

    console.debug('keydown', char);

    // if user is holding down command/ctrl for like select all, allow it
    if (e.metaKey) {
      return;
    }

    switch (char) {
      case "Delete":
      case "Backspace":
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown":
      return;
    }

    const input = e.target as HTMLInputElement;
    const regex = /^[0-9]+(\.[0-9]{0,2})?$/g;
    const value = input.value;

    let newValue: string;

    if (input.selectionStart && input.selectionEnd) {
      newValue = value.slice(0, input.selectionStart) + char + value.slice(input.selectionEnd);
    } else {
      newValue = `${value}${char}`;
    }

    const valid = newValue.match(regex);

    if (!valid) {
      e.preventDefault();
    }
  }
}
