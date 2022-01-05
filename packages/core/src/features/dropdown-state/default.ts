import type { SharedDropdownState } from '@uptab/core/shared/types/state';

export const dropdownDefaultStateValues: SharedDropdownState<unknown> = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ''
};
