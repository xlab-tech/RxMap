
import Map from '../../core/RxMap';
import getGoogleMap from '../../utils/google';

const renderPoint = function (point, style, properties) {
  // TODO: calcular el radio desde pixels a metros
  const googleMaps = getGoogleMap();
  const _map = this.getMap();
  const circle = new googleMaps.Circle({
    strokeColor: style.color || '#FF0000',
    strokeOpacity: style.opacity || 1,
    strokeWeight: style.weight || 1,
    fillColor: style.fillColor || '#FF0000',
    fillOpacity: style.fillOpacity || 0.35,
    map: _map,
    center: point,
    radius: style.radius * 100 || 500,
  });

  circle.properties = properties;
  return circle;
};

Map.register('renderPoint', renderPoint);

export default renderPoint;
