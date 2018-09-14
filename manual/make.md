
# Creación

## Como crear acciones
Una acción es una función que recibe unos parámetros y devuelve el resultado o una promesa, puede ser una función async. Los objetivos de las acciones son interaccionar con el mapa. 
Es recomendable que sólo utilicen un método o propiedad  sobre el mapa para que sea más fácil el desacoplarse.
Se pueden crear acciones que llamen a otras acciones.

Las acciones deben tener el mínimo posible de dependencias.
Es recomendable que cada acción se ubicaque en un fichero.
Las acciones se tienen que exportar como default  y se tiene que exportar la propiedad “name” con el nombre de la acción. Este nombre será el nombre con en el que se registre y se utilizará para invocarla desde RxMap o desde los observadores.

A todas las acciones se les inyecta como primer parámetro el contexto que es un objeto que incluye:
	*  RxMap
	* La librería Nativa del Mapa
	* El valor de la anterior acción
	* El store

Un ejemplo de acción sería.
```
 const setCenter = (context, paramA, paramB) => {
       const map = context.source.getMap();
	     const oldCenter = map.getCenter();
		 map.setCenter(paramA,paramB);
		 return map;
};

export default setCenter;

```

Para poder utilizar esta acción hay dos formas. La puedes registrar manualmente o tenerla en una libreria y registrar la libreria.

Para registrar manualmente una acción se tendría que hacer lo siguiente.

```
import { registerAction, RxMap } from ‘@rxmap/rxmap’;
import { name }, action from ‘./actionExample’;

registerAction(name,action);

RxMap.load(‘leaflet’);
RxMap.create(‘mapId’,0,0,8);
// aquí ya podríamos utilizar la acción 
RxMap.setCenter(2.35,42.112);

```

Si registramos las acciones no estaremos utilizando la capacidad de cargar el código de manera dynamica. Sino que se incluirán en el bundle principal de la aplicación.

## Como crear observadores
Un observador es una función que puede o no recibir parámetros y que devuelve siempre un observador [RxJS]( 	https://rxjs-dev.firebaseapp.com)

La idea de los observadores es reemplazar los eventos para poder tener más control sobre las cosas que pasan sobre el mapa. Y poder encadenar de manera mucho más simple acciones a partir de cosas que pasen.
Con los observadores se pueden utilizar todos los transformadores y operadores de RxJS.

Los observadores deben tener el mínimo posible de dependencias.
Es recomendable que cada observador se ubicaque en un fichero.
Los observadores se tienen que exportar como default  y se tiene que exportar la propiedad “name” con el nombre del observador. Este nombre será el nombre con en el que se registre y será el nombre con el que se recuperar el observador.

A todos los observadores se les inyecta como primer parámetro el contexto que es un objeto que incluye:
	*  RxMap
	* La librería Nativa del Mapa
	* El valor de la anterior acción
	* El store

Un ejemplo de observador podría ser:

```
import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';

const event = (context) => {
  const googleMaps = context.library.maps;
  const map_ = context.source.getMap();

  const addClickHandler = handler => map_.addListener('center_changed', handler);
  const removeClickHandler = (handler, listener) => googleMaps.event.removeListener(listener);


  return fromEventPattern(
    addClickHandler,
    removeClickHandler,
  ).pipe(map(() => {
    const center = map_.getCenter();
    return { lat: center.lat(), lng: center.lng() };
  }));
};

export default event;
/**
 * @private
*/
export const name = 'center';

```

Para poder utilizar este observador  hay dos formas. La puedes registrar manualmente o tenerlo en una libreria y registrar la libreria.

Para registrar manualmente el observador se tendría que hacer lo siguiente.

```
import { registerObserver, RxMap } from ‘@rxmap/rxmap’;
import { name }, observer from ‘./observerExample’;

registerObserver(name,observer);

RxMap.load(‘leaflet’);
RxMap.create(‘mapId’,0,0,8);
// aquí ya podríamos utilizar la acción 
RxMap.observer(‘center’).subscribe((data)=>{
   console.log(data);
});

```

Si registramos los observadores manualmente  no estaremos utilizando la capacidad de cargar el código de manera dynamica. Sino que se incluirán en el bundle principal de la aplicación.

## Como crear un middleware
Los middleware son funciones que devuelve una función, El middleware recibe como parámetro la siguiente acción a ejecutar y la función que devuelve debe ser asíncrona y recibe como parámetros el CommandBus que esta realizando la ejecución y los argumentos de la función en un array. La función debe devolver el resultado de la ejecución de la acción.

Desde el CommandBus se puede recuperar el contexto con getContext() y el nombre de la función que esta ejecutando con getActionName().

En el middleware puedes hacer aciones antes de llamar a la acción a ejecutar. Y puedes modificar o hacer acciones después de ejecutar la acción.

Un ejemplo de middleware podría ser el logger de las acciones:

```

export const LoggerMiddleware = next => async (CommandBus, args) => {
  const actionName = commandBus.getActionName();
  const now = new Date().getTime();
  const name = `Command ${actionName} [${now}]: `;
  console.log(`Pre ${name}`, args);
  const res = await next(Map, args);
  console.log(`Post ${name}`, res);
  return res;
};
```

Los middleware se tienen no se cargan dinámicamente se tienen que importar específicamente.

## Como crear una libreria

Las librerías se pueden crear dentro de tu proyecto o como un proyecto independiente para poder reaprovecharlas en otros proyectos.

Las librerías son un conjunto de acciones y observadores que ofrecen la misma funcionalidad sobre uno o diferentes mapas.

Idealmente tienen la siguiente estructura

<libName>_<type>_<mapType>:<version>/<actionName>

Example: lib_actions_google@latest_setCenter.js o lib_observer_google@latest_center.js

En las librerías cada acción o observador debe estar en un único fichero y cada fichero debe exponer en default la acción y debe exponer la propiedad name con el nombre de la acción

Las librerías tienen que tener un fichero index.js que incluya  lo siguiente:

	* la función de carga dynamica de sus acciones y observadores. Esta función recibirá como parámetros el tipo [observer|action] , el nombre de la libreria de mapas, la versión ( latest por defecto) y la clave o nombre de la acción o el observador. Se recomienda que se llame  ‘func’.
	
```
const func = (type, mapLib, version, key) => import(/* webpackMode: "lazy" */ `./${type}/${mapLib}@${version}/${key}`);

```

	* Array con el nombre de los observadores. Se recomienda que se llame  ‘observers’
	* Array con el nombre de las acciones. Se recomienda que se llame  ‘actions’
	* El nombre de la librería. Se recomienda que se llame  ‘name’.


Y es recomendable devolver en el parámetro por defecto un array con los datos en el orden que pide la función de registrar libreria.

Adjunto un ejemplo del fichero index.js

```

export const name = 'rxmap';
export const actions = ['addData', 'create', 'marker', 'point', 'popup', 'setCenter'];
export const observers = ['gps', 'center', 'click'];
export const func = (type, mapLib, version, key) => import(/* webpackMode: "lazy" */ `./${type}/${mapLib}@${version}/${key}`);

export default [
  name,
  {
    observers,
    actions,
  },
  func,
];

```


Cuando se compila las librerías tienen que inlcuir la version con Módulos ( Es2015 ) y la version UMD, en la versión UMD que suele ser la que se pública en servicios como unpkg la ruta de la carga de librerías dinámicas deber ser con la url completa no relativa.