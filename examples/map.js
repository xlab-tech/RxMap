
import { take, delay, map } from 'rxjs/operators';
import Map from '../src/RxMap';
import './leaflet';
import { registerMiddleware } from '../src/core/middlewares';
import { LoggerMiddleware, TimerMiddleware } from '../lib/middlewares/logger';

registerMiddleware(LoggerMiddleware);
registerMiddleware('create', TimerMiddleware);

Map.create('map', 51.505, -0.09, 13)
  .marker({ lat: 52.1, lng: -0.09 })
  .popup('adios Mundo');

Map.observer('center')
  .pipe(take(5))
  .subscribe(data => console.log('subscribe Center', data));

Map.observer('click')
  .marker((data => ({ lat: data.lat, lng: data.lng })))
  .subscribe(data => console.log('subscribe CLICK', data));

const positions = [
  { lat: 51.50270552998373, lng: -0.08368492126464844 },
  { lat: 51.53270552998373, lng: -0.08368492126464844 },
  { lat: 1, lng: 2 },
];

Map.observer(positions)
  .pipe(
    delay(1000),
    map((d) => {
      console.log('PRE 2 MAP', d);
      return d;
    }),
)
  .marker((res => ({ lat: res.lat, lng: res.lng })))
  .popup('click')
  .subscribe();

Map.marker({ lat: 51.523, lng: -0.08368492126466844 })
  .observer('click')
  .subscribe(data => console.log('log click marker', data));
