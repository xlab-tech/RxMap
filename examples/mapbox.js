import { RxMap, registerAction } from '../src/index';

registerAction('create', context => () => {
    const mapboxgl = context.library;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9'
    });
    return map;
});

const load = async () => {
    const map = await RxMap.load('mapbox', { key: process.env.MAPBOX_TOKEN });
    map.create();

};

load();
