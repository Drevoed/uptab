import { cleanupStatus } from './cleanup-status';
import { getStatusDiv } from './get-status-div';

export function setStatus(status: string, documentProp?: Document) {
  const div = getStatusDiv(documentProp);
  if (!status) {
    return;
  }

  div.textContent = status;
  cleanupStatus(documentProp);
}
