import exp from './index';

/**
 * Recupera el path de una url
 * @param {String} src
 * @private
 */
const getOrigin = (src) => {
  const url = new URL(src);
  return `${url.origin}/`;
};

/**
 * Recupera el Path del script actual
 * @private
 */
const getPath = () => {
  if (document.currentScript) {
    return getOrigin(document.currentScript.src);
  }
  const scripts = document.getElementsByTagName('script');
  return getOrigin(scripts[scripts.length - 1]);
};

// eslint-disable-next-line
__webpack_public_path__ = getPath();


if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    // eslint-disable-next-line
    navigator.serviceWorker.register(`${__webpack_public_path__}/@rxmap-sw.js`);
  });
}


/** @private */
export default exp;
