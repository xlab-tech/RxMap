
import { registerCommand } from '../../../src/core/registerCommand';
import { leafletPoint } from '../../../src/utils/transformPoint';
import extractProperties from '../../../src/utils/extractProperties';

const drawMarker = (context, point, options = {}, properties = {}) => {
  const L = context.library;
  const center = leafletPoint(point);
  const _map = context.RxMap.getMap();
  let markerOptions = {};
  if (options && options.icon) {
    const myIcon = L.icon({
      iconUrl: options.icon,
      iconSize: options.size ? [options.size.width, options.size.height] : null,
    });
    markerOptions = {
      icon: myIcon,
    };
  }

  const marker = L.marker(center, markerOptions);
  marker.properties = extractProperties(properties);
  marker.addTo(_map);
  return marker;
};

registerCommand('marker', drawMarker);

export default drawMarker;
