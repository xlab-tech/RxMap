import exp from './index';
import { getPath } from './utils/getPath';

// eslint-disable-next-line
__webpack_public_path__ = getPath();

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    // eslint-disable-next-line
    navigator.serviceWorker.register(`${__webpack_public_path__}@rxmap-sw.js`);
  });
}

/** @private */
export default exp;
