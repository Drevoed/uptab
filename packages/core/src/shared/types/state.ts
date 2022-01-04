import type { BaseItem } from '@uptab/core/entities/item';
import type { SharedParams } from '@uptab/core/shared/types/params';

type KeysToPick =
  | 'highlightedIndex'
  | 'isOpen'
  | 'selectedItem'
  | 'items'
  | 'environment'
  | 'itemToString';

export type SharedState<Item extends BaseItem> = Pick<
  Required<SharedParams<Item>>,
  KeysToPick
> & {
  inputValue: string;
  previousResultCount: number;
};
