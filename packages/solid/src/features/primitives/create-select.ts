import { createSignal, mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';

import type { BaseItem, SharedParams } from '@uptab/core';
import { createA11yMessageSetter, createElementIds } from '@uptab/core';

import { defaultProps } from './default-props';

export type CreateSelectParams<Item extends BaseItem> = SharedParams<Item>;

export function createSelect<Item extends BaseItem>(
  params: CreateSelectParams<Item>
) {
  const merged = mergeProps(defaultProps, params);
  const [previousResultCount, setPreviousResultCount] = createSignal<number>();
  const [itemRefs, setItemRefs] = createSignal<Record<string, HTMLElement>>({});
  const elementIds = createElementIds(params);

  const [state, setState] = createStore({
    ...merged,
    previousResultCount: 0,
    inputValue: ''
  });

  const getItemNodeFromIndex = (index: number) =>
    itemRefs()[elementIds.getItemId(index)];

  createA11yMessageSetter(() => '', state);
}
