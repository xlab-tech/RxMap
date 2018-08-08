

import Map from '../../core/RxMap';
import getGoogleMap from '../../utils/google';

const renderMarker = function (point, style, properties) {
  const googleMaps = getGoogleMap();
  const map = this.getMap();
  const image = {
    url: style.icon || 'https://unpkg.com/leaflet@1.2.0/dist/images/marker-icon.png',
    // This marker is 20 pixels wide by 32 pixels high.
    scaledSize: style.size ? new googleMaps.Size(style.size.width, style.size.height) : null,
    // The origin for this image is (0, 0).
    origin: new googleMaps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    // anchor: new googleMaps.Point(0, 32),
  };
  const markerMap = new googleMaps.Marker({
    position: point,
    map,
    icon: image,
  });
  markerMap.properties = properties;
  return markerMap;
};

Map.register('renderMarker', renderMarker);
