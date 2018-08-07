
import Map from './../src/core/RxDynamicMap';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { delay } from 'rxjs/internal/operators/delay';


import { LoggerMiddleware, TimerMiddleware } from './../src/middleware/logger.js';

const config = {
    'type': 'leaflet',
    'key': '',
    'commands': ['create', 'marker', 'popup', 'setCenter'],
    'observers': ['center', 'gps'],
    'config': {
        'center': {
            'lat': 51.505,
            'lng': -0.09
        },
        'zoom': 13,
        'baseMap': {
            'type': 'osm',
        },
        'layers': {}
    }
}
const p = async () => {

    await Map.load('map', config);

    Map.applyMiddlewares(LoggerMiddleware);

    Map.marker({ lat: 52.1, lng: -0.09 })
        .popup('adios Mundo');

    Map.observer('center')
        .pipe(take(5))
        .subscribe(data => console.log('subscribe Center', data))

    Map.observer('gps')
        .pipe(take(3))
        .setCenter(res => ({ lat: res.latitude, lng: res.longitude }))
        .subscribe((data) => console.log('GPS', data));
    /*Map.observer('click')
        .marker((data => [data.lat, data.lng]))
        .subscribe(data => console.log('subscribe CLICK', data));*/

    const positions = [
        { lat: 51.50270552998373, lng: -0.08368492126464844 },
        { lat: 51.53270552998373, lng: -0.08368492126464844 },
        { lat: 1, lng: 2 }
    ];

    Map.observer(positions)
        .pipe(
            delay(1000),
            map(d => {
                console.log('PRE 2 MAP', d);
                return d;
            })
        )
        .marker(res => res)
        .popup('click')
        .subscribe();
};
p();
