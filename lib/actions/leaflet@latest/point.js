
import leafletPoint from '../../utils/transformPointLeaflet';
import extractProperties from '../../utils/extractProperties';

const drawPoint = (context, point, style, properties) => {
  const L = context.library;
  // TODO: fixed default styles
  const center = leafletPoint(point);
  const _map = context.source.getMap();
  const marker = L.circleMarker(center, style);
  marker.properties = extractProperties(properties);
  marker.addTo(_map);
  return marker;
};

export default drawPoint;
/**
 * @private
*/
export const name = 'point';
