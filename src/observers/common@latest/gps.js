import Map from './../../core/RxMap';
import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const event = () => {

    const watchPosition = (handler) => {
        if (navigator.geolocation) {
            return navigator.geolocation.watchPosition(handler);
        }
    };
    const clearPosition = (handler) => {
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(handler);
        }
    };

    return fromEventPattern(
        watchPosition,
        clearPosition
    ).pipe(map(position => position.coords));
};

Map.registerObservable('gps', event);
