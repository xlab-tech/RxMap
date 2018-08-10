import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { RxMap } from './RxMap';
import { async } from '../../node_modules/rxjs/internal/scheduler/async';

let _RxMap;

const _commons = ['gps', 'addData'];

const loadLib = (lib, type, name, version = 'latest') => {
  const _lib = _commons.includes(name) ? 'common' : lib;
  return import(`../${type}/${_lib}@${version}/${name}.js`);
};

export class RxDynamicMapClass extends RxMap {
  constructor() {
    super();
    this.createAsync = true;
  }

  async load(lib, commands, observers, options = {}) {
    // First Load Map Lib
    if (lib === 'leaflet') {
      await import(/* webpackChunkName: "leaflet" */'leaflet');
    } else if (lib === 'google') {
      const { loadGoogle } = await import(/* webpackChunkName: "google" */'./../utils/google');
      await loadGoogle(options.key);
    }
    // After Load all Componentes
    if (!options.defer) {
      // After Load all Componentes
      const _commands = commands.map(key => loadLib(lib, 'commands', key, options.version));
      const _observers = observers.map(key => loadLib(lib, 'observers', key, options.version));
      return Promise.all(_commands.concat(_observers))
        .then(() => this);
    }
    commands.forEach((key) => {
      this.register(key, (...args) => {
        const res = loadLib(lib, 'commands', key, options.version);
        return res.then(command => command.default)
          .then(func => func(...args));
      });
    });
    observers.forEach((key) => {
      this.registerObservable(key, (...args) => from(loadLib(lib, 'observers', key, options.version))
        .pipe(switchMap(observer => observer.default(...args))));
    });
    return Promise.resolve(this);
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
