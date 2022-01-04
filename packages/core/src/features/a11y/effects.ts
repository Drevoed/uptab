import { createEffect, mergeProps, on } from 'solid-js';

import type { BaseItem } from '@uptab/core/entities/item';
import { updateStatus } from '@uptab/core/features';
import type { SharedParams } from '@uptab/core/shared/types';
import type { SharedState } from '@uptab/core/shared/types/state';

import type { A11yStatusMessageOptions } from './types';

export type createA11YMessageSetterParams<Item extends BaseItem> = {
  (getA11yMessage: (options: A11yStatusMessageOptions<Item>) => string): void;
};

export function createA11yMessageSetter<Item extends BaseItem>(
  getA11yMessage: (options: A11yStatusMessageOptions<Item>) => string,
  state: SharedState<Item>
) {
  const merged = mergeProps(
    {
      get resultCount() {
        return state.items.length;
      },
      get highlightedItem() {
        return state.items[state.highlightedIndex];
      }
    },
    state
  );

  createEffect(() => {
    updateStatus(
      () => getA11yMessage(merged),
      state.environment?.document || window.document
    );
  });
}
