import { createEffect, createSignal, mergeProps, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import type { BaseItem, SharedParams } from '@uptab/core';
import { createA11yMessageSetter, createElementIds } from '@uptab/core';

import { defaultProps } from './default-props';

export type CreateSelectParams<Item extends BaseItem> = SharedParams<Item>;

export function createSelect<Item extends BaseItem>(
  params: CreateSelectParams<Item>
) {
  const merged = mergeProps(defaultProps, params);
  const [itemRefs, setItemRefs] = createSignal<Record<string, HTMLElement>>({});
  const [initialRender, setInitialRender] = createSignal(true);
  const elementIds = createElementIds(params);

  let menuRef: HTMLElement | null = null;
  let toggleButtonRef: HTMLButtonElement | null = null;

  const [state, setState] = createStore({
    ...merged,
    previousResultCount: 0,
    inputValue: ''
  });

  const getItemNodeFromIndex = (index: number) =>
    itemRefs()[elementIds.getItemId(index)];

  onMount(() => setInitialRender(false));

  createA11yMessageSetter(
    state.getA11yStatusMessage,
    [
      () => state.isOpen,
      () => state.highlightedIndex,
      () => state.inputValue,
      () => state.items
    ],
    state
  );

  createA11yMessageSetter(
    state.getA11yStatusMessage,
    [() => state.selectedItem],
    state
  );

  createEffect(() => {
    // Don't focus menu on first render.
    if (initialRender()) {
      if (
        (state.initialIsOpen || state.defaultIsOpen || state.isOpen) &&
        menuRef
      ) {
        menuRef.focus();
      }

      return;
    }

    // Focus menu on open.
    if (state.isOpen) {
      if (menuRef) {
        menuRef.focus();
      }

      return;
    }

    // Focus toggleButton on close, but not if it was closed with (Shift+)Tab.
    if (state.environment.document.activeElement === menuRef) {
      if (toggleButtonRef) {
        toggleButtonRef.focus();
      }
    }
  });

  createEffect(() => {
    if (initialRender()) return;

    setState('previousResultCount', state.items.length);
  });

  createEffect(() => {
    if (!state.isOpen) {
      setItemRefs({});
    }
  });


}
