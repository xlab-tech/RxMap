import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import Map from '../../core/RxMap';

const event = (context) => {
  const map_ = context.RxMap.getMap();
  const addClickHandler = handler => map_.on('move', handler);
  const removeClickHandler = handler => map_.off('move', handler);

  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(() => map_.getCenter()));
};

Map.registerObservable('center', event);

export default event;
