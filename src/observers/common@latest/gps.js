import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import { registerObserver } from '../../core/registerObserver';


const event = () => {
  const watchPosition = handler => (navigator.geolocation ? navigator.geolocation.watchPosition(handler) : () => { });
  const clearPosition = handler => (navigator.geolocation ? navigator.geolocation.clearWatch(handler) : () => { });

  return fromEventPattern(
    watchPosition,
    clearPosition,
  ).pipe(map(position => position.coords));
};

registerObserver('gps', event);

export default event;
