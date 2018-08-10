
import Map from '../../core/RxMap';
import { leafletPoint } from '../../utils/transformPoint';

const setCenter = (context, options) => {
  const { zoom } = options;
  const map = context.RxMap.getMap();
  const center = leafletPoint(options, true) || { lat: map.center.lat, lng: map.center.lng };
  map.setView(center, zoom || map.zoom);
  return context.lastExecution;
};

Map.register('setCenter', setCenter);

export default setCenter;
