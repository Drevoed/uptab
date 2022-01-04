import type {
  A11yStatusMessageOptions,
  BaseItem,
  SharedParams
} from '@uptab/core';
import { getA11yStatusMessage, scrollIntoView } from "@uptab/core";

function itemToString(item: unknown) {
  return item ? String(item) : '';
}

function getA11ySelectionMessage<Item extends BaseItem>(
  selectionParameters: A11yStatusMessageOptions<Item>
) {
  const { selectedItem, itemToString: itemToStringLocal } = selectionParameters;

  return selectedItem
    ? `${itemToStringLocal(selectedItem)} has been selected.`
    : '';
}

export const defaultProps: Required<Omit<SharedParams<{}>, 'items'>> = {
  itemToString,
  getA11ySelectionMessage,
  scrollIntoView,
  circularNavigation: false,
  environment: typeof window !== 'undefined' ? ({} as any) : window,
  selectedItem: null,
  highlightedIndex: -1,
  initialHighlightedIndex: -1,
  getA11yStatusMessage,
  defaultHighlightedIndex: -1,
  initialIsOpen: false,
  isOpen: false,
  defaultIsOpen: false,
  initialSelectedItem: null,
  defaultSelectedItem: null,
  id: '',
  labelId: '',
  menuId: '',
  getItemId: () => '',
  toggleButtonId: ''
};
