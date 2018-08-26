import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const event = (context) => {
  const map_ = context.RxMap.getMap();
  const addClickHandler = handler => map_.on('move', handler);
  const removeClickHandler = handler => map_.off('move', handler);

  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(() => map_.getCenter()));
};

export default event;
/**
 * @private
*/
export const name = 'center';
