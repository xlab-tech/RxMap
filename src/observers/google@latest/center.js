import Map from './../../core/Map.js';
import { Observable } from 'rxjs/Observable.js';
import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/operator/map';

const event = function () {
    const map = this.getMap();
    const addClickHandler = function (handler) {
        return map.addListener('center_changed', handler);
    };
    const removeClickHandler = function (handler, listener) {
        google.maps.event.removeListener(listener);
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
