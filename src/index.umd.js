import 'url-polyfill';
import './importFunctions';
import exp from './index';


const getOrigin = (src) => {
  const url = new URL(src);
  return `${url.origin}/`;
};

const getPath = () => {
  if (document.currentScript) {
    return getOrigin(document.currentScript.src);
  }
  const scripts = document.getElementsByTagName('script');
  return getOrigin(scripts[scripts.length - 1]);
};

// eslint-disable-next-line
__webpack_public_path__ = getPath();

export default exp;
