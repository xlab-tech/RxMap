import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { delay } from 'rxjs/internal/operators/delay';
import RxMapFromConfig from '../src/core/config';
import { LoggerMiddleware, TimerMiddleware } from '../src/middleware/logger';

const config = {
  type: 'leaflet',
  options: {
    key: 'AIzaSyCjj-I0sYedbWCAmAoW2LgAr4T2bkPa09Y',
  },
  commands: ['create', 'marker', 'popup', 'setCenter', 'addData', 'renderPoint', 'renderMarker'],
  observers: ['center', 'click'],
  map: {
    autoCenter: true,
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 13,
  },
  dataTypes: [
    {
      id: 'test',
      geomType: 'point',
      style: {
        color: '#F00',
        fillColor: '#F00',
        radius: 10,
        opacity: 1,
        fillOpacity: 0.5,
        weight: 1,
      },
    },
    {
      id: 'pre',
      geomType: 'point',
      style: {
        color: '#0000ff ',
        fillColor: '#0000ff ',
        radius: 5,
        opacity: 1,
        fillOpacity: 0.5,
        weight: 1,
      },
    },
    {
      id: 'mar',
      geomType: 'marker',
      style: {
        icon: 'https://www.freeiconspng.com/uploads/red-location-map-pin-icon-5.png',
        size: { width: 24, height: 34 },
      },
    },
  ],
  layers: [],
};

const dataTest = [
  {
    position: {
      lat: 42,
      lng: 2.4,
    },
    test: 'asf',
    otro: 'oooo',
  },
  {
    position: {
      lat: 42.1,
      lng: 2.4,
    },
    test: 'asf',
    otro: 'oooo',
  },
];
const dataPre = [
  {
    position: {
      lat: 42.05,
      lng: 2.4,
    },
    test: 'asf',
    otro: 'oooo',
  },
  {
    position: {
      lat: 42.1,
      lng: 2.42,
    },
    test: 'asf',
    otro: 'oooo',
  },
];
const dataMar = [
  {
    position: {
      lat: 41.95,
      lng: 2.4,
    },
    test: 'asf',
    otro: 'oooo',
  },
];

const p = async () => {
  const Map = await RxMapFromConfig('map', config);

  Map.applyMiddlewares(LoggerMiddleware);

  Map.marker({ lat: 52.1, lng: -0.09 })
    .popup('adios Mundo');

  Map.observer('center')
    .pipe(take(5))
    .subscribe(data => console.log('subscribe Center', data));

  /* Map.observer('gps')
       .pipe(take(3))
       //.setCenter(res => ({ lat: res.latitude, lng: res.longitude }))
       .subscribe((data) => console.log('GPS', data));

       */

  Map.observer('click')
    .marker((data => data))
    .subscribe(data => console.log('subscribe CLICK', data));

  const positions = [
    { lat: 51.50270552998373, lng: -0.08368492126464844 },
    { lat: 51.53270552998373, lng: -0.08368492126464844 },
    { lat: 1, lng: 2 },
  ];

  Map.observer(positions)
    .pipe(
      delay(1000),
      map((d) => {
        console.log('PRE 2 MAP', d);
        return d;
      }),
    )
    .marker(res => res)
    .popup('click')
    .subscribe();

  Map.addData('test', dataTest).popup('feature');
  Map.addData('mar', dataMar);

  Map.addData('pre', dataPre)
    .observer('click')
    .subscribe(data => console.log('subscribe CLICK DATA PRE', data));
};
p();
