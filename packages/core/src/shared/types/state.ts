import type { BaseItem } from '@uptab/core/entities/item';
import type { SharedParams } from '@uptab/core/shared/types/params';

type KeysToPick = 'highlightedIndex' | 'isOpen' | 'selectedItem';

export type SharedState<Item extends BaseItem> = Pick<
  SharedParams<Item>,
  KeysToPick
>;
