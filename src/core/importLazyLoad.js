
import { getCommand } from './registerCommand';

const _importFunctions = {};
const _commons = ['gps', 'addData'];

const loadJS = url => new Promise((resolve) => {
  const location = document.head;
  const implementationCode = (args) => {
    resolve(args);
  };
  const scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.onload = implementationCode;
  scriptTag.onreadystatechange = implementationCode;
  location.appendChild(scriptTag);
});

export const addImportFunction = (lib, func) => {
  _importFunctions[lib] = func;
};

export const loadLib = async (lib, type, name, version = 'latest') => {
  const _lib = _commons.includes(name) ? 'common' : lib;
  let command = name;
  if (typeof name === 'string') {
    command = {
      key: name,
      lib: 'rxmap',
    };
  }
  if (command.path) {
    await loadJS(`${command.path}/${type}/${_lib}@${version}/${command.key}.js`);
    return getCommand(command.key);
  }
  const importFunc = _importFunctions[command.lib];
  let module;
  if (importFunc) {
    module = await importFunc(`${type}/${_lib}@${version}/${command.key}`);
  } else {
    module = await import(`./../../lib/${type}/${_lib}@${version}/${command.key}`);
  }
  return module.default;
};

export const loadAllRootLib = name => Promise.all(Object.keys(_importFunctions).map(key => _importFunctions[key](name)));
