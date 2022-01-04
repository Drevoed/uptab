export function getA11yStatusMessage({
  isOpen,
  resultCount,
  previousResultCount
}: {
  isOpen: boolean;
  resultCount: number;
  previousResultCount: number;
}) {
  if (!isOpen) {
    return '';
  }

  if (!resultCount) {
    return 'No results are available.';
  }

  if (resultCount !== previousResultCount) {
    return `${resultCount} result${
      resultCount === 1 ? ' is' : 's are'
    } available, use up and down arrow keys to navigate. Press Enter key to select.`;
  }

  return '';
}
