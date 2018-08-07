import { RxMap } from './RxMap';

let Map;

const _commons = ['gps'];

const createMap = () => {
    if (!Map) {
        Map = new RxDynamicMap();
    }
    return Map;
};
const loadLib = (lib, type, name, version = 'latest') => {
    const _lib = _commons.includes(name) ? 'common' : lib;
    return import(`../${type}/${_lib}@${version}/${name}.js`);
};

export class RxDynamicMap extends RxMap {

    async load(id, conf) {
        // conf =  {} || uid || http
        const { type, commands, observers, config } = conf;
        const load = await this.loadModules(type, commands, observers);
        const { center, zoom } = config;
        this.create(id, center.lat, center.lng, zoom);
        return load;
    }
    async loadModules(lib, commands, observers) {
        // First Load Map Lib
        if (lib === 'leaflet') {
            await import(/* webpackChunkName: "leaflet" */'leaflet');
        } else if (lib === 'google') {
            const { loadGoogle } = await import(/* webpackChunkName: "google" */'./../utils/google');
            const google = await loadGoogle('AIzaSyCjj-I0sYedbWCAmAoW2LgAr4T2bkPa09Y');
        }
        // After Load all Componentes
        const _commands = commands.map(key => loadLib(lib, 'commands', key));
        const _observers = observers.map(key => loadLib(lib, 'observers', key));
        return Promise.all(_commands.concat(_observers))
            .then(() => Map);
    }
    init() {
        return new RxDynamicMap();
    }
}

export default createMap();
