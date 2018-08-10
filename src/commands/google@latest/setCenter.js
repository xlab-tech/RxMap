
import registerCommand from '../../core/registerCommand';
import { googlePoint } from '../../utils/transformPoint';

const setCenter = (context, options) => {
  const { zoom } = options;
  const map = context.RxMap.getMap();
  const oldCenter = map.getCenter();
  const center = googlePoint(options, true) || { lat: oldCenter.lat, lng: oldCenter.lng };
  map.setCenter(center);
  map.setZoom(zoom || map.getZoom());
  return context.lastExecution;
};

registerCommand('setCenter', setCenter);

export default setCenter;
