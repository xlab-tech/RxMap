import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const event = (context) => {
  const googleMaps = context.library.maps;
  const map_ = context.source.getMap();

  const addClickHandler = handler => map_.addListener('center_changed', handler);
  const removeClickHandler = (handler, listener) => googleMaps.event.removeListener(listener);


  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(() => {
    const center = map_.getCenter();
    return { lat: center.lat(), lng: center.lng() };
  }));
};

export default event;
/**
 * @private
*/
export const name = 'center';
