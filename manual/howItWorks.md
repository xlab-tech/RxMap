
# Como funciona
## Cargar
Para empezar a utilizar la librería lo primero es cargar el mapa que se quiere utilizar para ello se puede hacer de dos maneras. Directamente con el método load o con loadConfig los dos son métodos asíncronos que puedes usar con await o con formato promesa.


```
import { RxMap } from '@rxmap/rxmap';
const config = {};
await RxMap.load(‘leaflet’,config);
```

```
import { RxMap } from '@rxmap/rxmap';
const config = {};
RxMap.load(‘leaflet’,config).then((map)=>{
   // execute actions
});

```

O 

```
import { RxMapFromConfig } from '@rxmap/rxmap';

const config = {
  type: 'leaflet',
  options: {
    key: '',
  },
  map: {
    autoCenter: false,
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 13,
  },
};


const map = await RxMapFromConfig(config);


```

## Librerías
Para utilizar las acciones y los observadores tienes que cargar las librerías que quieras de acciones y observadores,  propias o de terceros. Al cargar las librerías ya tienes disponibles todas las acciones que incorporen estas librerías en RxMap o en los observadores, (‘una vez los recuperas desde RxMap’ < `rxMap.observer(from(5))`>). Pero al tener carga dinámica no bajas el código de todas las acciones, reduciendo el tiempo de carga, sino que se cargara el código de cada acción o observador cuando la utilices. ( lazy Loader) 

La función registerLib, espera como parámetros el nombre de la librería, un objeto con los nombre de acciones y con los nombre de los observadores a cargar de esa libreria, y la función para la carga dynamica de las acciones y observadores

```
import { registerLib } from '@rxmap/rxmap';

registerLib(‘test’,{
	observers:[‘test’],
	actions:[‘example’]
},
(type, mapLib, version, key) => import(/* webpackMode: "lazy" */ `./${type}/${mapLib}@${version}/${key}`);
);

```

Idealmente las librerías incluyen en default un array con los parámetros ya preparados.

```
import { registerLib } from '@rxmap/rxmap';
import rxLib from '@rxmap/rxmap/lib';

registerLib(...rxLib);
```

Otra forma de tener acciones o observadores es registrándolos para poder utilizarlos,pero de esta forma no tendrás la carga dynamica I tendrás que gestionar ,qual cargas según la librería de mapas que estes utilizando. Al contrario las librerías gestionan esto de manera automática. 
Consulta la librería que utilizas para saber que mapas soporta. 

## Acciones
Las acciones son funciones “puras” que realizan acciones sobre el mapa, la idea es que solo realicen una única acción para que sean mucho más fáciles de reaprovechar , probar y debugar. Ponemos "puras" entrecomilladas porque realmente la mayoria no pueden ser puras al realizar manipulaciones del Dom inderectamente al crear objetos del mapa.
Las acciones se pueden invocar sobre RxMap o sobre un observador. Las acciones se pueden anidar entre ellas. Cada invocación de acciones es  asíncrona pero dentro de cada secuencia en síncrona. Cada acción recibe el valor de la acción anterior para poder concatenar acciones.

```
RxMap.test();

RxMap.test2().test();

RxMap.observer(from(1)).test();

```

## Observadores
Los observadores son funciones que devuelven un observador ( RxJs )  para por ejemplo , gestionar los eventos del mapa como puede ser el click, o para gestionar datos que se pueden recibir continuamente como la posición GPS, el centro del mapa, etc...
Con los observadores se pueden utilizar todos los operadores de RxJs para modificar, transformar , etc.. los valores del observador.

También se pueden utilizar observadores creados con RxJs para utilizar las acciones de RxMap. 
Cuando  se utiliza un observador, se puede pasar como parámetro a la acción una función que transforme los argumentos en un array con los argumentos que espera la acción.
 

```
RxMap.observer(‘<observer name>’).subscribe((data) => console.log);

RxMap.observer(‘gps’).pipe(take(2)).subscribe(data=>console.log(data));

RxMap.observer(from([{lat:1,lng:2},{lat:2,lng:3}]).marker(data=>([data.lat,data.lng])).subscribe()


```

## Middlewares
RxMap también te permite usar middlewares, para realizar acciones como:
	* Logger de las funciones
	* Realizar acciones antes o después de la ejecución de las acciones.
	* Aplicar transformaciones
	* Etc...

Un middleware lo puedes aplicar sobre todas las acciones o sobre una acción en concreto.
Si al registrar el middleware el primer parámetro es un string, sólo se aplicará a la acción con ese nombre. Si el primer parámetro es el middleware se aplicará a todas las acciones.

Se pueden aplicar todos los middleware que se deseen.

```

registerMiddleware(LoggerMiddleware);

O

registerMiddleware('marker', TimerMiddleware);

```

## Observar acciones
Con RxMap  puedes observar las acciones para poder saber cuando se llama una acción concreta  o un grupo de acciones con una expresión RegEx y realizar otra operación.

```

RxMap.observerAction('marker').subscribe((data) => {
    console.log("Action Subscriber 1 got data >>>>> ", data);
  });


RxMap.observerAction('.').subscribe((data) => {
    console.log("Action Subscriber 2 got data >>>>> ", data);
  });

```

## Store Observable
RxMap dispone de un store que  te permite guardar información y observarla para realizar acciones cuando esta información se modifique.

```
RxMap.observerStore(‘test’).subscribe((data) => {
    console.log("Store Subscriber 1 got data >>>>> ", data);
  });

RxMap.observerStore(‘.’).subscribe((data) => {
    console.log("Store Subscriber 2 got data >>>>> ", data);
  });

RxMap.store.test = ‘example’;

RxMap.store.example = 5;

const t = RxMap.store.test;


```


Con estas opciones te permite generar un código mucho más desacoplado de la librería de mapas que quieras utilizar y de esas forma tu código tendrá una vida mucho más larga, pudiendo actualizar cada versión de la librería o cambiando de ella con un esfuerzo mucho menor.
