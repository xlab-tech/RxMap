import Map from './../../core/RxMap';
import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const event = function () {
    const map_ = this.getMap();
    let object = map_;
    const lastValue = this.value();
    const { value, name } = lastValue;
    let mapFunction = (evt) => evt.latlng;
    if (name === 'marker') {
        object = value;
        mapFunction = (evt) => {
            console.log("MARKER", evt);
            return value;
        };
    }
    const addClickHandler = function (handler) {
        return object.on('click', handler);
    };
    const removeClickHandler = function (handler) {
        object.off('click', handler);
    };

    return fromEventPattern(
        addClickHandler,
        removeClickHandler
    ).pipe(map(mapFunction));

};

Map.registerObservable('click', event);
