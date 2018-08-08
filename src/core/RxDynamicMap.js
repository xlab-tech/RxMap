import { RxMap } from './RxMap';

let _RxMap;

const _commons = ['gps', 'addData'];

const loadLib = (lib, type, name, version = 'latest') => {
  const _lib = _commons.includes(name) ? 'common' : lib;
  return import(`../${type}/${_lib}@${version}/${name}.js`);
};

export class RxDynamicMapClass extends RxMap {
  async load(lib, commands, observers, options = {}) {
    // First Load Map Lib
    if (lib === 'leaflet') {
      await import(/* webpackChunkName: "leaflet" */'leaflet');
    } else if (lib === 'google') {
      const { loadGoogle } = await import(/* webpackChunkName: "google" */'./../utils/google');
      await loadGoogle(options.key);
    }
    // After Load all Componentes
    const _commands = commands.map(key => loadLib(lib, 'commands', key, options.version));
    const _observers = observers.map(key => loadLib(lib, 'observers', key, options.version));
    return Promise.all(_commands.concat(_observers))
      .then(() => this);
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
