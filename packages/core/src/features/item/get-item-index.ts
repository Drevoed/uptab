import type { BaseItem } from '@uptab/core/entities/item';

export function getItemIndex<Item extends BaseItem>(
  index: number | undefined,
  item: Item,
  items: Item[]
) {
  if (index !== undefined) {
    return index;
  }
  if (items.length === 0) {
    return -1;
  }
  return items.indexOf(item);
}
