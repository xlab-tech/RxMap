
import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import CommandBus from './core/CommandBus';
import { registerObserver } from './core/registerObserver';
import { registerCommand, getCommand } from './core/registerCommand';

let _Map;

const _commons = ['gps', 'addData'];

const loadJS = (url) => {
  // url is URL of external file, implementationCode is the code
  // to be called from the file, location is the location to 
  // insert the <script> element
  return new Promise((resolve) => {
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
};

const loadLib = async (lib, type, name, version = 'latest') => {
  const _lib = _commons.includes(name) ? 'common' : lib;
  if (typeof name === 'object') {
    await loadJS(`${name.path}/${type}/${_lib}@${version}/${name.key}.js`);
    return getCommand(name);
  }

  const module = await import(`../lib/${type}/${_lib}@${version}/${name}.js`)
  return module.default;
};

export class RxMapClass extends CommandBus {
  constructor() {
    super();
    this.createAsync = false;
    this._dataTypes = {};
    super.setSource(this);
  }

  setMap(map) {
    this._sourceMap = map;
  }

  getMap() {
    return this._sourceMap;
  }

  async _loadMapLibrary(lib, options) {
    if (lib === 'leaflet') {
      const _lib = import(/* webpackChunkName: "leaflet" */'leaflet');
      if (!options.noLoadCommands) {
        await _lib;
        await import(/* webpackChunkName: "leaflet@latest" */'./../lib/leaflet@latest');
      }
      return _lib;
    }

    if (lib === 'google') {
      const { loadGoogle } = await import(/* webpackChunkName: "google" */'./utils/google');
      const _lib = loadGoogle(options.key);
      if (!options.noLoadCommands) {
        await _lib;
        await import(/* webpackChunkName: "google@latest" */'./../lib/google@latest');
      }
      return _lib;
    }
    throw new Error(`Library ${lib} not supported`);
  }

  async load(lib, options = {}) {
    const { commands, observers } = options;
    if (commands || observers) {
      options.noLoadCommands = true;
    }
    // First Load Map Lib
    this._nativeLibrary = await this._loadMapLibrary(lib, options);

    if (!commands || !observers) {
      return this;
    }
    if (!options.defer) {
      // After Load all Commands and observers if not defer the loader.
      const _commands = commands.map(key => loadLib(lib, 'commands', key, options.version));
      const _observers = observers.map(key => loadLib(lib, 'observers', key, options.version));
      return Promise.all(_commands.concat(_observers))
        .then(() => this);
    }

    // create commands and observers for loader funcions when use it.
    commands.forEach((key) => {
      registerCommand(key, (...args) => {
        const res = loadLib(lib, 'commands', key, options.version);
        return res.then(func => func(...args));
      });
    });
    observers.forEach((key) => {
      registerObserver(key, (...args) => from(loadLib(lib, 'observers', key, options.version))
        .pipe(switchMap(observer => observer(...args))));
    });
    return Promise.resolve(this);
  }

  getMapLibrary() {
    if (this._nativeLibrary) {
      return this._nativeLibrary;
    }
    if (window.L) {
      return window.L;
    }
    if (window.google && window.google.maps) {
      return window.google;
    }
    return null;
  }

  init() {
    return new RxMapClass();
  }

  /**
     * style:  icon / size / color / opacity / width / fillColor / radius
     * geomType: marker / point / line / polygon
     */
  setDataType(id, geomType, style) {
    this._dataTypes[id] = { geomType, style };
  }

  getDataType(id) {
    return this._dataTypes[id];
  }
}

const createMap = () => {
  if (!_Map) {
    _Map = new RxMapClass();
  }
  return _Map;
};

export default createMap();
