
import L from 'leaflet';
import { registerCommand } from '../../core/registerCommand';
import { leafletPoint } from '../../utils/transformPoint';
import extractProperties from '../../utils/extractProperties';

const drawPoint = (context, point, style, properties) => {
  // TODO: fixed default styles
  const center = leafletPoint(point);
  const _map = context.RxMap.getMap();
  const marker = L.circleMarker(center, style);
  marker.properties = extractProperties(properties);
  marker.addTo(_map);
  return marker;
};

registerCommand('point', drawPoint);

export default drawPoint;
