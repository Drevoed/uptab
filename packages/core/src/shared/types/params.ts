import type { BaseItem } from '@uptab/core/entities/item';
import type { A11yStatusMessageOptions } from '@uptab/core/features/a11y';
import type { Environment } from '@uptab/core/shared/types/environment';

export type SharedParams<Item extends BaseItem> = {
  items: Item[];
  itemToString?: (item: Item | null) => string;
  getA11yStatusMessage?: (options: A11yStatusMessageOptions<Item>) => string;
  getA11ySelectionMessage?: (options: A11yStatusMessageOptions<Item>) => string;
  circularNavigation?: boolean;
  highlightedIndex?: number;
  initialHighlightedIndex?: number;
  defaultHighlightedIndex?: number;
  isOpen?: boolean;
  initialIsOpen?: boolean;
  defaultIsOpen?: boolean;
  selectedItem?: Item | null;
  initialSelectedItem?: Item | null;
  defaultSelectedItem?: Item | null;
  id?: string;
  labelId?: string;
  menuId?: string;
  toggleButtonId?: string;
  getItemId?: (index: number) => string;
  scrollIntoView?: (node: HTMLElement, menuNode: HTMLElement) => void;
  environment?: Environment;
};
