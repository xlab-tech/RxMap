import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const center = (context) => {
  const googleMaps = context.library.maps;
  const map_ = context.source.getMap();

  const addClickHandler = handler => map_.addListener('center_changed', handler);
  const removeClickHandler = (handler, listener) => googleMaps.center.removeListener(listener);


  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(() => {
    const _center = map_.getCenter();
    return { lat: _center.lat(), lng: _center.lng() };
  }));
};

export default center;
/**
 * @private
*/
export const name = 'center';
