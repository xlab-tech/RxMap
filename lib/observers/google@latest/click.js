import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const click = (context) => {
  const map_ = context.source.getMap();
  const { value, name } = context.lastExecution;
  let object = map_;
  let mapFunction = evt => ({ lat: evt[0].latLng.lat(), lng: evt[0].latLng.lng() });

  if (name === 'marker') {
    object = value;
    mapFunction = evt => (evt[1].properties || evt[1]);
  } else if (name === 'addData') {
    object = value;
    mapFunction = evt => (evt[1].properties || evt[1]);
  }

  if (!Array.isArray(object)) {
    object = [object];
  }
  const addClickHandler = handler => object.map(element => element.addListener('click', evt => handler(evt, element)));
  const removeClickHandler = (handler, listener) => listener.forEach(element => element.remove());

  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(mapFunction));
};

export default click;
/**
 * @private
*/
export const name = 'click';
