
import L from 'leaflet';
import Map from '../../core/RxMap';

const marker = function (options) {
  const { lat, lng, properties } = options;
  const map = this.getMap();
  const markerMap = L.marker([lat, lng]).addTo(map);
  markerMap.properties = properties;
  return markerMap;
};

Map.register('marker', marker);

export default marker;
