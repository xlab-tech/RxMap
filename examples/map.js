
import Map from './../src/core/RxMap';
import './leaflet';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

import { LoggerMiddleware, TimerMiddleware } from './../src/middleware/logger.js';

Map.applyMiddlewares(LoggerMiddleware);
Map.applyMiddlewares('create', TimerMiddleware);

Map.create('map', 51.505, -0.09, 13)
  .marker({ lat: 52.1, lng: -0.09 })
  .popup('adios Mundo');

Map.observer('center')
  .take(5)
  .subscribe(data => console.log('subscribe Center', data))

Map.observer('click')
  .marker((data => ({ lat: res.lat, lng: res.lng })))
  .subscribe(data => console.log('subscribe CLICK', data));

const positions = [
  { lat: 51.50270552998373, lng: -0.08368492126464844 },
  { lat: 51.53270552998373, lng: -0.08368492126464844 },
  { lat: 1, lng: 2 }
];

Map.observer(positions)
  .delay(1000)
  .map(d => {
    console.log("PRE 2 MAP", d);
    return d;
  })
  .marker((res => ({ lat: res.lat, lng: res.lng })))
  .popup('click')
  .subscribe();


Map.observer(positions)
  .delay(1000)
  .map(d => {
    console.log("PRE 2 MAP", d);
    return d;
  })
  .marker((res => ({ lat: res.lat, lng: res.lng })))
  .observer('click')
  .subscribe(data => console.log('Subscribe positions', data));

Map.marker({ lat: 51.523, lng: -0.08368492126466844 })
  .observer('click')
  .subscribe((data) => console.log('log click marker', data))
