import { RxMap, registerAction } from '../src/index';

registerAction('create', (context) => {
  const googleMaps = context.library.maps;
  const _map = new googleMaps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 5,
  });
  return _map;
});

const load = async () => {
  const map = await RxMap.load('google', { key: process.env.GOOGLE_TOKEN });
  map.create();

};

load();
