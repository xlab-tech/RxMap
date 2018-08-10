
import L from 'leaflet';
import Map from '../../core/RxMap';
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

Map.register('point', drawPoint);

export default drawPoint;
