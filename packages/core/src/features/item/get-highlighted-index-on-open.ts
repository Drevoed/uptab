import type { BaseItem } from '@uptab/core/entities/item';
import type { SharedParams } from '@uptab/core/shared/types';
import type { SharedInternalState } from '@uptab/core/shared/types/state';

import { getNextWrappingIndex } from './get-next-wrapping-index';

export function getHighlightedIndexOnOpen<Item extends BaseItem>(
  props: SharedParams<Item>,
  state: { selectedItem: Item | null; highlightedIndex: number },
  offset: number,
  getItemNodeFromIndex: (index: number) => HTMLElement
) {
  // Destructuring is ok here because the reactivity is not needed here
  const { items, initialHighlightedIndex, defaultHighlightedIndex } = props;
  const { selectedItem, highlightedIndex } = state;

  if (items.length === 0) {
    return -1;
  }

  // initialHighlightedIndex will give value to highlightedIndex on initial state only.
  if (
    initialHighlightedIndex !== undefined &&
    highlightedIndex === initialHighlightedIndex
  ) {
    return initialHighlightedIndex;
  }
  if (defaultHighlightedIndex !== undefined) {
    return defaultHighlightedIndex;
  }
  if (selectedItem) {
    if (offset === 0) {
      return items.indexOf(selectedItem);
    }
    return getNextWrappingIndex(
      offset,
      items.indexOf(selectedItem),
      items.length,
      getItemNodeFromIndex,
      false
    );
  }
  if (offset === 0) {
    return -1;
  }
  return offset < 0 ? items.length - 1 : 0;
}
