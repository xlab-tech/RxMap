
import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import CommandBus from './core/CommandBus';
import { registerObserver } from './core/registerObserver';
import { registerCommand } from './core/registerCommand';
import { loadLib } from './core/importLazyLoad';
import importMapLibrary from './core/importMapLibrary';
// import './importFunctions';

let _Map;

/**
 * RxMap
 * @extends CommandBus
 */
export class RxMapClass extends CommandBus {
  constructor() {
    super();
    this.createAsync = false;
    this._dataTypes = {};
    this.setSource(this);
    this._importLib = {};
  }

  setMap(map) {
    this._sourceMap = map;
  }

  getMap() {
    return this._sourceMap;
  }

  addImportLib(lib, func) {
    this._importLib[lib] = func;
  }


  async load(lib, options = {}) {
    const { commands, observers } = options;
    if (commands || observers) {
      // eslint-disable-next-line no-param-reassign
      options.noLoadCommands = true;
    }
    // First Load Map Lib
    this._nativeLibrary = await importMapLibrary(lib, options);

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
    commands.forEach((item) => {
      const key = typeof item === 'string' ? item : item.key;
      registerCommand(key, (...args) => {
        const res = loadLib(lib, 'commands', item, options.version);
        return res.then(func => func(...args));
      });
    });
    observers.forEach((item) => {
      const key = typeof item === 'string' ? item : item.key;
      registerObserver(key, (...args) => from(loadLib(lib, 'observers', item, options.version))
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
