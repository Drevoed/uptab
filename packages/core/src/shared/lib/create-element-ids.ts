import { mergeProps } from 'solid-js';

import { Key } from '@uptab/core/shared/lib/key';

type CreateElementIdsParams = {
  id?: string;
  labelId?: string;
  menuId?: string;
  getItemId?: (index: number) => string;
  toggleButtonId?: string;
  inputId?: string;
};

export function createElementIds(props: CreateElementIdsParams) {
  const key = new Key();
  const id = `uptab-${key.id}`;
  const mergedProps = mergeProps(
    {
      id,
      labelId: `${id}-label`,
      menuId: `${id}-menu`,
      getItemId: (index: number) => `${id}-item-${index}`,
      toggleButtonId: `${id}-toggle-button`,
      inputId: `${id}-input`
    },
    props
  );

  return {
    get labelId() {
      return mergedProps.labelId;
    },
    get menuId() {
      return mergedProps.menuId;
    },
    get getItemId() {
      return mergedProps.getItemId;
    },
    get toggleButtonId() {
      return mergedProps.toggleButtonId;
    },
    get inputId() {
      return mergedProps.inputId;
    }
  };
}
