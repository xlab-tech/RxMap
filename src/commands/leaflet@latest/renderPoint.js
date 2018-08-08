
import L from 'leaflet';
import Map from '../../core/RxMap';

const renderPoint = function (point, style, properties) {
  // TODO: fixed default styles
  const center = [point.lat, point.lng];
  const _map = this.getMap();
  const marker = L.circleMarker(center, style);
  marker.properties = properties;
  marker.addTo(_map);
  return marker;
};

Map.register('renderPoint', renderPoint);
