import Map from './../../core/Map.js';
import { Observable } from 'rxjs/Observable.js';
import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/operator/map';

const event = function () {
    const map = this.getMap();
    let object = map;
    const lastValue = this.value();
    const { value, name } = lastValue;
    let mapFunction = (evt) => evt.latlng;
    if (name === 'marker') {
        object = value;
        mapFunction = (evt) => {
            console.log("MARKER",evt);
            return value;
        };
    }
    const addClickHandler = function (handler) {
        return object.on('click', handler);
    };
    const removeClickHandler = function (handler) {
        object.off('click', handler);
    };

    return Observable.fromEventPattern(
        addClickHandler,
        removeClickHandler
    ).map(mapFunction);

};

Map.registerObservable('click', event);
