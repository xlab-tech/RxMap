import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import Map from '../../core/RxMap';

const event = function () {
  const map_ = this.getMap();
  let object = [map_];
  const lastValue = this.value();
  const { value, name } = lastValue;
  let mapFunction = evt => ({ lat: evt[0].latLng.lat(), lng: evt[0].latLng.lng() });
  if (name === 'marker') {
    object = [value];
    mapFunction = evt => (evt[1].properties || evt[1]);
  } else if (name === 'addData') {
    object = value;
    mapFunction = evt => (evt[1].properties || evt[1]);
  }

  const addClickHandler = function (handler) {
    return object.map(element => element.addListener('click', evt => handler(evt, element)));
  };
  const removeClickHandler = function () {
    object.forEach(element => element.remove());
  };

  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(mapFunction));
};

Map.registerObservable('click', event);
