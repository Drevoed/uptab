import type { BaseItem, SharedParams } from '@uptab/core';
import { createElementIds } from '@uptab/core';

export type CreateSelectParams<Item extends BaseItem> = SharedParams<Item>;

export function createSelect<Item extends BaseItem>(
  params: CreateSelectParams<Item>
) {
  const elementIds = createElementIds(params);

  elementIds.getItemId()
}
