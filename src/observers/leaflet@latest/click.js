import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import L from 'leaflet';
import Map from '../../core/RxMap';

const event = function () {
  const map_ = this.getMap();
  let object = [map_];
  const lastValue = this.value();
  const { value, name } = lastValue;
  let mapFunction = evt => evt.latlng;
  if (name === 'marker') {
    object = [value];
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

  const addClickHandler = function (handler) {
    return object.map(element => element.on('click', handler));
  };
  const removeClickHandler = function (handler) {
    object.forEach(element => element.off('click', handler));
  };

  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(mapFunction));
};

Map.registerObservable('click', event);

export default event;
