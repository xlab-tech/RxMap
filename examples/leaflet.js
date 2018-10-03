import { RxMap, registerAction } from '../src/index';

registerAction('create', context => () => {

  const L = context.library;
  const map = L.map('map').setView([0, 0], 5);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;

});

const load = async () => {
  const map = await RxMap.load('leaflet');
  map.create();

};

load();
