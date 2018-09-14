# Instalación

## NPM
```
Npm install @rxmap\rxmap —save
```

## CDN
```
<head>
<script type=‘application/javascript’ src=‘https://unpkg.com/@rxmap/rxmap@0.0.2’ defer/>
</head>

```


# Como utilizarla
 
```
import { RxMap } from ‘@rxmap/rxmap’;
await RxMap.load(‘leaflet’);
RxMap.create(‘mapId’,2.45,41.56,10);
RxMap.marker(2.45,41.56).popup(‘hello’);

```

O  para versión de CDN.

```
R.RxMap.load(‘leaflet’);
R.RxMap.create(‘mapId’,2.45,41.56,10);
R.RxMap.marker(2.45,41.56).popup(‘hello’);

```

La primera acción que se tiene que invocar debe devolver el mapa inicial inicializado, normalmente esta acción se llama ‘create’ y debe ser sincrona, es decir no devolver una promesa. Es recomendable no anidar las llamadas a create, sino volver a hacer llamadas sobre RxMap, como se observa en los ejemplos anteriores.
