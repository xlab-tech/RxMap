
import Map from '../../core/RxMap';

const setCenter = function (options) {
  const { lat, lng, zoom } = options;
  const map = this.getMap();
  const lastValue = this.value();
  const oldCenter = map.getCenter();
  const center = { lat: lat || oldCenter.lat, lng: lng || oldCenter.lng };
  map.setCenter(center);
  map.setZoom(zoom || map.getZoom());
  return lastValue;
};

Map.register('setCenter', setCenter);
