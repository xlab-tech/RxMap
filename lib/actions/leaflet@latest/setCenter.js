
import leafletPoint from '../../utils/transformPointLeaflet';

const setCenter = (context, options) => {
  const { zoom } = options;
  const map = context.source.getMap();
  const center = leafletPoint(options, true) || { lat: map.center.lat, lng: map.center.lng };
  map.setView(center, zoom || map.zoom);
  return context.lastExecution.value;
};

export default setCenter;
/**
 * @private
*/
export const name = 'setCenter';
