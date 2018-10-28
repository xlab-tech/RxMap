/**
 * Recupera el path de una url
 * @param {String} src
 * @private
 */
const getOrigin = (src) => {
  const url = new URL(src);
  const path = url.pathname.split('/');
  path.pop();
  return `${url.origin}${path.join('/')}/`;
};

export const getSrc = () => {
  if (document.currentScript) {
    return document.currentScript.src;
  }
  const scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
};

/**
 * Recupera el Path del script actual
 * @private
 */
export const getPath = () => getOrigin(getSrc());
