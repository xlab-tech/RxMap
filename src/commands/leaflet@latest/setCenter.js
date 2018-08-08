
import Map from '../../core/RxMap';

const setCenter = function (options) {
  const { lat, lng, zoom } = options;
  const map = this.getMap();
  const lastValue = this.value();
  const center = { lat: lat || map.center.lat, lng: lng || map.center.lng };
  map.setView(center, zoom || map.zoom);
  return lastValue;
};

Map.register('setCenter', setCenter);
