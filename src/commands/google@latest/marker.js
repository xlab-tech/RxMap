

import Map from '../../core/RxMap';
import getGoogleMap from '../../utils/google';
import { googlePoint } from '../../utils/transformPoint';
import extractProperties from '../../utils/extractProperties';

const drawMarker = (context, point, options = {}, properties = {}) => {
  const googleMaps = getGoogleMap();
  const map = context.RxMap.getMap();
  const markerOptions = {
    position: googlePoint(point),
    map,
  };
  if (options && options.icon) {
    const image = {
      url: options.icon,
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize: options.size ? new googleMaps.Size(options.size.width, options.size.height) : null,
      // The origin for this image is (0, 0).
      origin: new googleMaps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new googleMaps.Point(0, 32),
    };
    markerOptions.icon = image;
  }

  const markerMap = new googleMaps.Marker(markerOptions);
  markerMap.properties = extractProperties(properties);
  return markerMap;
};

Map.register('marker', drawMarker);

export default drawMarker;
