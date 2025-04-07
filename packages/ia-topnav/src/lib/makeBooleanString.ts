export function makeBooleanFromString(value: string): 'true' | 'false' {
  const lowerValue = value.toLowerCase();
  let booleanValue: boolean = false;
  if (lowerValue === 'true' || lowerValue === '1') {
    booleanValue = true;
  }
  return makeBooleanString(booleanValue);
}

export function makeBooleanString(value: boolean): 'true' | 'false' {
  return value ? 'true' : 'false';
}
