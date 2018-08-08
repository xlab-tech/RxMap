import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import Map from '../../core/RxMap';
import getGoogleMap from '../../utils/google';

const event = function () {
  const googleMaps = getGoogleMap();
  const map_ = this.getMap();
  const addClickHandler = function (handler) {
    return map_.addListener('center_changed', handler);
  };
  const removeClickHandler = function (handler, listener) {
    googleMaps.event.removeListener(listener);
  };

  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(() => {
    const center = map_.getCenter();
    return { lat: center.lat(), lng: center.lng() };
  }));
};

Map.registerObservable('center', event);
