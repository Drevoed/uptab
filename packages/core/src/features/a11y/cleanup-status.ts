import debounce from 'just-debounce-it';

import { getStatusDiv } from './get-status-div';

export const cleanupStatus = debounce((documentProp?: Document) => {
  getStatusDiv(documentProp).textContent = '';
}, 500);
