import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const gps = () => {
  const watchPosition = handler => (navigator.geolocation ? navigator.geolocation.watchPosition(handler) : () => { });
  const clearPosition = handler => (navigator.geolocation ? navigator.geolocation.clearWatch(handler) : () => { });

  return fromEventPattern(
    watchPosition,
    clearPosition,
  ).pipe(map(position => position.coords));
};

export default gps;
