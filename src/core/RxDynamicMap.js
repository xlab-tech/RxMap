import { RxMap } from './RxMap';

let _RxMap;

const _commons = ['gps', 'addData'];

const createMap = () => {
    if (!_RxMap) {
        _RxMap = new RxDynamicMap();
    }
    return _RxMap;
};
const loadLib = (lib, type, name, version = 'latest') => {
    const _lib = _commons.includes(name) ? 'common' : lib;
    return import(`../${type}/${_lib}@${version}/${name}.js`);
};

export class RxDynamicMap extends RxMap {

    async load(lib, commands, observers, options = {}) {
        // First Load Map Lib
        if (lib === 'leaflet') {
            await import(/* webpackChunkName: "leaflet" */'leaflet');
        } else if (lib === 'google') {
            const { loadGoogle } = await import(/* webpackChunkName: "google" */'./../utils/google');
            const google = await loadGoogle(options.key);
        }
        // After Load all Componentes
        const _commands = commands.map(key => loadLib(lib, 'commands', key, options.version));
        const _observers = observers.map(key => loadLib(lib, 'observers', key, options.version));
        return Promise.all(_commands.concat(_observers))
            .then(() => this);
    }
    init() {
        return new RxDynamicMap();
    }
}

export default createMap();
