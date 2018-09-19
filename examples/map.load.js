import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { delay } from 'rxjs/internal/operators/delay';
import { RxMapFromConfig, registerMiddleware, registerLib, RxMap } from '../src/index';
import { LoggerMiddleware, TimerMiddleware } from '../src/map/middlewares/logger';
import observableStore from '../src/core/observableStore';

// import '../src/importFunctions';

import { from } from 'rxjs/internal/observable/from';

import rxLib from '@rxmap/basiclib';

const config = {
  type: 'leaflet',
  options: {
    key: 'AIzaSyCjj-I0sYedbWCAmAoW2LgAr4T2bkPa09Y',
  },
  map: {
    autoCenter: false,
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
    test: '11111',
    otro: 'oooo',
  },
  {
    position: {
      lat: 42.1,
      lng: 2.4,
    },
    properties: {
      test: '222222',
      otro: 'oooo',
    },
  },
];
const dataPre = [
  {
    lat: 42.05,
    lng: 2.4,
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
  [41.95, 2.4],
];

const positions = [
  { lat: 51.50270552998373, lng: -0.08368492126464844 },
  { lat: 51.53270552998373, lng: -0.08368492126464844 },
  { lat: 1, lng: 2 },
];

for (let i = 0; i < 200; i++) {
  // positions.push({ lat: 51.50270552998373, lng: -0.08368492126464844 });
}
registerLib(...rxLib);
registerLib(
  'test',
  {
    actions: ['test']
  },
  (type, mapLib, version, key) => import(`./test/${type}/${mapLib}@${version}/${key}`)
);

const p = async () => {
  const Map = await RxMapFromConfig('map', config);

  Map.observerAction('.').subscribe((data) => {
    console.log("ACTION Subscriber 1 got data >>>>> ", data);
  });

  registerMiddleware(LoggerMiddleware);
  // registerMiddleware('addData', TimerMiddleware);
  Map.test('kkkkk');

  Map.marker({ lat: 51.5, lng: -0.09 })
    .popup('adios Mundo');

  Map.observer('click')
    .marker((data => data))
    .subscribe(data => console.log('subscribe CLICK', data));

  console.time('test');
  Map.observer(positions)
    .pipe(
      //delay(1000),
      map((d) => {
        //console.log('PRE 2 MAP', d);
        return d;
      }),
    )
    .marker(res => res)
    .popup('click')
    .subscribe({
      complete: () => {
        console.timeEnd('test');
        console.log("EE");
      }
    });

  Map.observer('center')
    .pipe(take(5))
    .subscribe(data => console.log('subscribe Center', data));

  document.getElementById('addData').addEventListener('click', () => {
    Map.addData('mar', dataMar);
    Map.addData('test', dataTest).popup(props => `<br> Esto es un ejemplo <b>${props.test}</b>`);


    Map.addData('pre', dataPre)
      .observer('click')
      .subscribe(data => console.log('subscribe CLICK DATA PRE', data));
  });

  Map.observer('gps')
    .pipe(take(1))
    .setCenter(res => ({ lat: res.latitude, lng: res.longitude }))
    .subscribe(data => console.log('GPS', data));


};
p();


debugger;
const t = from([1, 2, 3]);
//const $p = RxMap.observer(t);

//$p.subscribe(console.log);


class pepe {

}

const a = new pepe();

var bb = new Proxy(a, {
  get: function (target, name, receiver) {
    console.log('get called for field: ', name);
    if (!target.hasOwnProperty(name)) {
      // do I have to store `name` into global variable, to reference it in `apply trap?    
      // methodName = name
      return (...args) => {
        console.log(...args);
        // TODO: Aqui lo que se quiera

        return receiver;//new Proxy(target, this);;
      };
      return new Proxy(target[name], this);
    }
    return Reflect.get(target, name, receiver);
  },
  apply: (target, receiver, args) => {
    debugger;
    console.log('methodName: ', 'I need methodName here. how do I get  -withdraw- here?');
    //TODO do some before-method call task here
    return Reflect.apply(target, receiver, args);
  }
});


const r = bb.test();
r.test('asdfas', 4);
console.log(r);


const store = observableStore();
const store2 = observableStore();


store.pepe = "hola";
store.test = "test";
console.log(store.pepe);
store.observer('p.').subscribe(res => console.log('STORE:', res));
store.hola = "hola";
store.pepe = "eeoeo";
console.log(store.pepe);

