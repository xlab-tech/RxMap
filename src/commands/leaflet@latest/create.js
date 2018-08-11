import L from 'leaflet';
import { registerCommand } from '../../core/registerCommand';


const create = (context, id, lat, lng, zoom) => {
  const map = L.map(id).setView([lat, lng], zoom);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  context.RxMap.setMap(map);
  return map;
};

registerCommand('create', create);

export default create;
