import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import { registerObserver } from '../../../src/core/registerObserver';

const event = (context) => {
  const L = context.library;
  const map_ = context.RxMap.getMap();
  const { value, name } = context.lastExecution;
  let object = map_;
  let mapFunction = evt => evt.latlng;

  if (name === 'marker') {
    object = value;
    mapFunction = (evt) => {
      L.DomEvent.stopPropagation(evt);
      return evt.target.properties || evt.target;
    };
  } else if (name === 'addData') {
    object = value;
    mapFunction = (evt) => {
      L.DomEvent.stopPropagation(evt);
      return evt.target.properties || evt.target;
    };
  }

  if (!Array.isArray(object)) {
    object = [object];
  }

  const addClickHandler = handler => object.map(element => element.on('click', handler));
  const removeClickHandler = handler => object.forEach(element => element.off('click', handler));

  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(mapFunction));
};

registerObserver('click', event);

export default event;
