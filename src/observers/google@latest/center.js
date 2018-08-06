import Map from './../../core/RxMap';
import { Observable } from 'rxjs/Observable.js';
import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/operator/map';
import getGoogleMap from './../../utils/google';

const event = function () {
    const googleMaps = getGoogleMap();
    const map = this.getMap();
    const addClickHandler = function (handler) {
        return map.addListener('center_changed', handler);
    };
    const removeClickHandler = function (handler, listener) {
        googleMaps.event.removeListener(listener);
    };

    return Observable.fromEventPattern(
        addClickHandler,
        removeClickHandler
    ).map(() => {
        const center = map.getCenter();
        return { lat: center.lat(), lng: center.lng() };
    });

};

Map.registerObservable('center', event);
