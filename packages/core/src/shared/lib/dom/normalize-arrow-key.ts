export function normalizeArrowKey(event: KeyboardEvent) {
  const { key, keyCode } = event;
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return `Arrow${key}`;
  }
  return key;
}
