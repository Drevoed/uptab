import debounce from 'just-debounce-it';

import { setStatus } from './set-status';

export const updateStatus = debounce(
  (getA11yMessage: () => string, document: Document) => {
    setStatus(getA11yMessage(), document);
  },
  200
);
