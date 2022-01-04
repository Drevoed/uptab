import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

export function scrollIntoView(node: HTMLElement, menuNode: HTMLElement) {
  if (!node) return;

  scrollIntoViewIfNeeded(node, {
    boundary: menuNode,
    block: 'nearest',
    scrollMode: 'if-needed'
  });
}
