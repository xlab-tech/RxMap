
import googlePoint from '../../utils/transformPointGoogle';
import extractProperties from '../../utils/extractProperties';

const drawPoint = (context, point, style, properties) => {
  // TODO: calcular el radio desde pixels a metros
  const googleMaps = context.library.maps;
  const _map = context.source.getMap();
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

export default drawPoint;
/**
 * @private
*/
export const name = 'point';
