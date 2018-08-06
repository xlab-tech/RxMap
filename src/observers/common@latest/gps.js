import Map from './../../core/RxMap';
import { Observable } from 'rxjs/Observable.js';
import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/operator/map';

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

    return Observable.fromEventPattern(
        watchPosition,
        clearPosition
    ).map(position => position.coords);
};

Map.registerObservable('gps', event);
