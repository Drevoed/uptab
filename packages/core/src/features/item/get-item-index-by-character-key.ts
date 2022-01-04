import type { BaseItem } from '@uptab/core/entities/item';

export type GetItemIndexByCharacterKeyOptions<Item extends BaseItem> = {
  keysSoFar: string;
  highlightedIndex: number;
  items: Item[];
  itemToString: (item: Item | null) => string;
  getItemNodeFromIndex: (index: number) => HTMLElement | undefined;
};

export function getItemIndexByCharacterKey<Item extends BaseItem>({
  keysSoFar,
  highlightedIndex,
  items,
  itemToString,
  getItemNodeFromIndex
}: GetItemIndexByCharacterKeyOptions<Item>) {
  const lowerCasedKeysSoFar = keysSoFar.toLowerCase();

  for (let index = 0; index < items.length; index++) {
    const offsetIndex = (index + highlightedIndex + 1) % items.length;
    const item = items[offsetIndex];

    if (
      item !== undefined &&
      itemToString(item).toLowerCase().startsWith(lowerCasedKeysSoFar)
    ) {
      const element = getItemNodeFromIndex(offsetIndex);

      if (!element?.hasAttribute('disabled')) {
        return offsetIndex;
      }
    }
  }

  return highlightedIndex;
}
