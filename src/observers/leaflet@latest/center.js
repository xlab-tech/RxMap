import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import Map from '../../core/RxMap';

const event = function () {
  const map_ = this.getMap();
  const addClickHandler = function (handler) {
    return map_.on('move', handler);
  };
  const removeClickHandler = function (handler) {
    map_.off('move', handler);
  };

  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(() => {
    const center = map_.getCenter();
    return center;
  }));
};

Map.registerObservable('center', event);

export default event;
