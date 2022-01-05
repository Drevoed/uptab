import type { BaseItem } from '@uptab/core/entities/item';
import type { SharedParams } from '@uptab/core/shared/types';

import { dropdownDefaultStateValues } from './default';

function capitalizeString(string: string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
}

// TODO: fix typings to pick only existing props
export function getDefaultValue<Item extends BaseItem>(
  props: SharedParams<Item>,
  propKey: string,
  defaultStateValues = dropdownDefaultStateValues
): any {
  const defaultPropKey = `default${capitalizeString(propKey)}`;

  if (defaultPropKey in props) {
    // @ts-ignore
    return props[defaultPropKey];
  }

  // @ts-ignore
  return defaultStateValues[propKey];
}
