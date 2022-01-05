import type { BaseItem } from '@uptab/core/entities/item';
import type { SharedParams } from '@uptab/core/shared/types/params';

type KeysToPick =
  | 'highlightedIndex'
  | 'isOpen'
  | 'selectedItem'
  | 'items'
  | 'environment'
  | 'itemToString';

export type SharedInternalState<Item extends BaseItem> = Pick<
  Required<SharedParams<Item>>,
  KeysToPick
> & {
  inputValue: string;
  previousResultCount: number;
};

export type SharedDropdownState<Item extends BaseItem> = {
  highlightedIndex: number;
  isOpen: boolean;
  selectedItem: Item | null;
  inputValue: string;
};
