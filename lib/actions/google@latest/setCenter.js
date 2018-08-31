
import googlePoint from '../../utils/transformPointGoogle';

const setCenter = (context, options) => {
  const { zoom } = options;
  const map = context.source.getMap();
  const oldCenter = map.getCenter();
  const center = googlePoint(options, true) || { lat: oldCenter.lat, lng: oldCenter.lng };
  map.setCenter(center);
  map.setZoom(zoom || map.getZoom());
  return context.lastExecution.value;
};

export default setCenter;
/**
 * @private
*/
export const name = 'setCenter';
