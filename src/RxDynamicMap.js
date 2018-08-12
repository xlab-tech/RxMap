import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { RxMap } from './RxMap';
import { registerObserver } from './core/registerObserver';
import { registerCommand } from './core/registerCommand';

let _RxMap;

const _commons = ['gps', 'addData'];

const loadLib = (lib, type, name, version = 'latest') => {
  const _lib = _commons.includes(name) ? 'common' : lib;
  // COMMANDS_PATH: inject from webpack environment variable
  return import(`${COMMANDS_PATH}/${type}/${_lib}@${version}/${name}.js`);
};

export class RxDynamicMapClass extends RxMap {
  constructor() {
    super();
    this.createAsync = true;
  }

  async loadMapLibrary(lib, options) {
    if (lib === 'leaflet') {
      return import(/* webpackChunkName: "leaflet" */'leaflet');
    }

    if (lib === 'google') {
      const { loadGoogle } = await import(/* webpackChunkName: "google" */'./utils/google');
      return loadGoogle(options.key);
    }
    throw new Error(`Library ${lib} not supported`);
  }

  async load(lib, commands, observers, options = {}) {
    // First Load Map Lib
    this._nativeLibrary = await this.loadMapLibrary(lib, options);
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
        return res.then(command => command.default)
          .then(func => func(...args));
      });
    });
    observers.forEach((key) => {
      registerObserver(key, (...args) => from(loadLib(lib, 'observers', key, options.version))
        .pipe(switchMap(observer => observer.default(...args))));
    });
    return Promise.resolve(this);
  }

  getMapLibrary() {
    return this._nativeLibrary;
  }

  init() {
    return new RxDynamicMapClass();
  }
}
const RxDynamicMap = () => {
  if (!_RxMap) {
    _RxMap = new RxDynamicMapClass();
  }
  return _RxMap;
};

export default RxDynamicMap();
