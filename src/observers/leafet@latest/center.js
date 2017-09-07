import Map from './../../core/Map.js';
import { Observable } from 'rxjs/Observable.js';
import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/operator/map';

const event = function () {
    const map = this.getMap();
    const addClickHandler = function (handler) {
        return map.on('move', handler);
    };
    const removeClickHandler = function (handler) {
        map.off('move',handler);
    };

    return Observable.fromEventPattern(
        addClickHandler,
        removeClickHandler
    ).map((evt) => {
        const center = map.getCenter();
        return center;
    });

};

Map.registerObservable('center', event);
