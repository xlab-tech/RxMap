
import L from 'leaflet';
import Map from '../../core/RxMap';

const renderMarker = function (point, style, properties) {
  const _map = this.getMap();
  const myIcon = L.icon({
    iconUrl: style.icon || 'https://unpkg.com/leaflet@1.2.0/dist/images/marker-icon.png',
    iconSize: style.size ? [style.size.width, style.size.height] : null,
  });
  const options = {
    icon: myIcon,
  };
  const marker = L.marker(point, options);
  marker.properties = properties;
  marker.addTo(_map);
  return marker;
};

Map.register('renderMarker', renderMarker);
