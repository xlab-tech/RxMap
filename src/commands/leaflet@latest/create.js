import L from 'leaflet';
import Map from '../../core/RxMap';

const create = function (id, lat, lng, zoom) {
  const map = L.map(id).setView([lat, lng], zoom);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  this.setMap(map);

  return map;
};

Map.register('create', create);
