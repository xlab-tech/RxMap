
import registerCommand from '../../core/registerCommand';
import getGoogleMap from '../../utils/google';
import { googlePoint } from '../../utils/transformPoint';
import extractProperties from '../../utils/extractProperties';

const drawPoint = (context, point, style, properties) => {
  // TODO: calcular el radio desde pixels a metros
  const googleMaps = getGoogleMap();
  const _map = context.RxMap.getMap();
  const circle = new googleMaps.Circle({
    strokeColor: style.color || '#FF0000',
    strokeOpacity: style.opacity || 1,
    strokeWeight: style.weight || 1,
    fillColor: style.fillColor || '#FF0000',
    fillOpacity: style.fillOpacity || 0.35,
    map: _map,
    center: googlePoint(point),
    radius: style.radius * 100 || 500,
  });

  circle.properties = extractProperties(properties);
  return circle;
};

registerCommand('point', drawPoint);

export default drawPoint;