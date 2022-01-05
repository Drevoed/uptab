import type { SetStoreFunction } from 'solid-js/store';

import type { BaseItem, SharedParams } from '@uptab/core';
import {
  getDefaultValue,
  getHighlightedIndexOnOpen,
  getItemIndexByCharacterKey,
  getNextNonDisabledIndex,
  getNextWrappingIndex
} from '@uptab/core';

import { SelectStateChangeTypes } from './state-change-types';

export type SelectDispatchAction<Item extends BaseItem> = {
  props: Required<SharedParams<Item>>;
  type: SelectStateChangeTypes;
  getItemNodeFromIndex: (index: number) => HTMLElement;
  shiftKey?: boolean;
  key?: string;
  index: number;
  highlightedIndex?: number;
  selectedItem?: Item | null;
  inputValue?: string;
};

type SelectState<Item extends BaseItem> = {
  highlightedIndex: number;
  selectedItem: Item | null;
  isOpen: boolean;
  inputValue: string;
};

export const selectReducer = <Item extends BaseItem>(
  state: SelectState<Item>,
  setState: SetStoreFunction<SelectState<Item>>,
  action: SelectDispatchAction<Item>
) => {
  const { type, props, shiftKey } = action;
  let changes: Partial<SelectState<Item>> = {};

  switch (type) {
    case SelectStateChangeTypes.ItemClick:
      changes = {
        isOpen: getDefaultValue(props, 'isOpen'),
        highlightedIndex: getDefaultValue(props, 'highlightedIndex'),
        selectedItem: props.items[action.index]
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.ToggleButtonKeyDownCharacter:
      {
        const lowercasedKey = action.key;
        const inputValue = `${state.inputValue}${lowercasedKey}`;
        const itemIndex = getItemIndexByCharacterKey({
          keysSoFar: inputValue,
          highlightedIndex: state.selectedItem
            ? props.items.indexOf(state.selectedItem)
            : -1,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex
        });

        changes = {
          inputValue,
          ...(itemIndex >= 0 && {
            selectedItem: props.items[itemIndex]
          })
        };
      }

      setState(changes);

      break;
    case SelectStateChangeTypes.ToggleButtonKeyDownArrowDown:
      changes = {
        highlightedIndex: getHighlightedIndexOnOpen(
          props,
          state,
          1,
          action.getItemNodeFromIndex
        ),
        isOpen: true
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.ToggleButtonKeyDownArrowUp:
      changes = {
        highlightedIndex: getHighlightedIndexOnOpen(
          props,
          state,
          -1,
          action.getItemNodeFromIndex
        ),
        isOpen: true
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.MenuKeyDownEnter:
    case SelectStateChangeTypes.MenuKeyDownSpaceButton:
      changes = {
        isOpen: getDefaultValue(props, 'isOpen'),
        highlightedIndex: getDefaultValue(props, 'highlightedIndex'),
        ...(state.highlightedIndex >= 0 && {
          selectedItem: props.items[state.highlightedIndex]
        })
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.MenuKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(
          1,
          0,
          props.items.length,
          action.getItemNodeFromIndex,
          false
        )
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.MenuKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(
          -1,
          props.items.length - 1,
          props.items.length,
          action.getItemNodeFromIndex,
          false
        )
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.MenuKeyDownEscape:
      changes = {
        isOpen: false,
        highlightedIndex: -1
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.MenuBlur:
      changes = {
        isOpen: false,
        highlightedIndex: -1
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.MenuKeyDownCharacter:
      {
        const lowercasedKey = action.key;
        const inputValue = `${state.inputValue}${lowercasedKey}`;
        const highlightedIndex = getItemIndexByCharacterKey({
          keysSoFar: inputValue,
          highlightedIndex: state.highlightedIndex,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex
        });

        changes = {
          inputValue,
          ...(highlightedIndex >= 0 && {
            highlightedIndex
          })
        };
      }

      setState(changes);

      break;
    case SelectStateChangeTypes.MenuKeyDownArrowDown:
      changes = {
        highlightedIndex: getNextWrappingIndex(
          shiftKey ? 5 : 1,
          state.highlightedIndex,
          props.items.length,
          action.getItemNodeFromIndex,
          props.circularNavigation
        )
      };

      setState(changes);

      break;
    case SelectStateChangeTypes.MenuKeyDownArrowUp:
      changes = {
        highlightedIndex: getNextWrappingIndex(
          shiftKey ? -5 : -1,
          state.highlightedIndex,
          props.items.length,
          action.getItemNodeFromIndex,
          props.circularNavigation
        )
      };

      setState(changes);

      break;

    case SelectStateChangeTypes.FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem
      };

      setState(changes);

      break;
    default:
      // TODO: fix
      throw new Error('what');
  }

  return state;
};
