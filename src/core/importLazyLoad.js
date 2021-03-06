

const _importFunctions = {};

// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
const ready = (cb) => {
  if (document.body) {
    return cb();
  }
  setTimeout(() => ready(cb));
  return null;
};

const getRef = () => {
  const refs = (document.body || document.getElementsByTagName('head')[0]).childNodes;
  return refs[refs.length - 1];
};

const addElement = (tag) => {
  ready(() => {
    const ref = getRef();
    // Inject link
    // Note: the ternary preserves the existing behavior of 'before' argument, but we could choose to change the argument to 'after'
    // in a later release and standardize on ref.nextSibling for all refs
    // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
    if (ref && ref.parentNode) {
      ref.parentNode.insertBefore(tag, ref.nextSibling);
    } else {
      document.head.appendChild(tag);
    }
  });
};

/*
const loadJS = url => new Promise((resolve) => {
  const implementationCode = args => resolve(args);
  const scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.onload = implementationCode;
  scriptTag.onreadystatechange = implementationCode;
  addElement(scriptTag);
});
*/

export const loadCSS = href => new Promise((resolve) => {
  const ss = document.createElement('link');
  ss.rel = 'stylesheet';
  ss.href = href;
  // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
  ss.media = 'only x';
  addElement(ss);
  // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
  const onloadcssdefined = (cb) => {
    const resolvedHref = ss.href;
    const sheets = document.styleSheets;
    let i = sheets.length;
    i -= 1;
    while (i) {
      if (sheets[i].href === resolvedHref) {
        return cb();
      }
      i -= 1;
    }
    setTimeout(() => onloadcssdefined(cb));
    return null;
  };

  const loadCB = () => {
    if (ss.addEventListener) {
      ss.removeEventListener('load', loadCB);
    }
    ss.media = 'all';
    resolve(ss);
  };

  // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
  if (ss.addEventListener) {
    ss.addEventListener('load', loadCB);
  }
  ss.onloadcssdefined = onloadcssdefined;
  onloadcssdefined(loadCB);
});

/**
   *
   *  Funcion que permite añadir librerias externas para cargar dinamicamente nuevos
   *  comandos y observadores
   *  la funcion recibe como parametro la ruta del fichero a cargar siguiendo el siguiente
   *  patron ${type}/${mapLib}@${version}/${action.key} y la funcion tiene que hacer el import
   *  dinamico import()
   * @example
   *
   * RxMap.addImportLib('test',arg => import(`../lib/${arg}`));
   *
   * @param {string} lib Nombre de la libreria
   * @param {function} func Funcion a invocar
   */
export const addImportFunction = (lib, func) => {
  _importFunctions[lib] = func;
};

export const loadLib = async (lib, mapLib, type, key, version = 'latest') => {
  const importFunc = _importFunctions[lib];
  if (importFunc) {
    const module = await importFunc(type, mapLib, version, key);
    return module.default || module[key];
  }
  throw new Error(`not Found Import function for ${lib}`);
};
