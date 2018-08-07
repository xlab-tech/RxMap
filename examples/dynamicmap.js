
import Map from './../src/core/RxDynamicMap';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

import { LoggerMiddleware, TimerMiddleware } from './../src/middleware/logger.js';

const p = async () => {

    await Map.loadModules('leaflet', ['create', 'marker', 'popup'], ['center', 'click']);

    Map.applyMiddlewares(LoggerMiddleware);
    Map.applyMiddlewares('create', TimerMiddleware);

    Map.create('map', 51.505, -0.09, 13)
        .marker(52.1, -0.09)
        .popup('adios Mundo');

    Map.observer('center')
        .take(5)
        .subscribe(data => console.log('subscribe Center', data))

    Map.observer('click')
        .marker((data => [data.lat, data.lng]))
        .subscribe(data => console.log('subscribe CLICK', data));

    const positions = [
        { lat: 51.50270552998373, lng: -0.08368492126464844 },
        { lat: 51.53270552998373, lng: -0.08368492126464844 },
        { lat: 1, lng: 2 }
    ];

    Map.observer(positions)
        .delay(1000)
        .map(d => {
            console.log("PRE 2 MAP", d);
            return d;
        })
        .marker((res => [res.lat, res.lng]))
        .popup('click')
        .subscribe();
};
p();

// });


/*

Map.observer(positions)
    .delay(1000)
    .map(d => {
        console.log("PRE 2 MAP", d);
        return d;
    })
    .marker((res => [res.lat, res.lng]))
    .observer('click')
    .subscribe(data => console.log('Subscribe positions', data));

Map.marker(51.523, -0.08368492126466844)
    .observer('click')
    .subscribe((data) => console.log('log click marker', data))
*/