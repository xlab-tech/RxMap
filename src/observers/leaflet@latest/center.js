import Map from './../../core/RxMap';
import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const event = function () {
    const map_ = this.getMap();
    const addClickHandler = function (handler) {
        return map_.on('move', handler);
    };
    const removeClickHandler = function (handler) {
        map_.off('move', handler);
    };

    return fromEventPattern(
        addClickHandler,
        removeClickHandler
    ).pipe(map((evt) => {
        const center = map_.getCenter();
        return center;
    }));

};

Map.registerObservable('center', event);
