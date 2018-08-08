
import L from 'leaflet';
import Map from '../../core/RxMap';

const renderPoint = function (point, style, properties) {
  // TODO: fixed default styles
  const _map = this.getMap();
  const marker = L.circleMarker(point, style);
  marker.properties = properties;
  marker.addTo(_map);
  return marker;
};

Map.register('renderPoint', renderPoint);
