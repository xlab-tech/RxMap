# RxMap
![](https://avatars0.githubusercontent.com/u/37194013?s=400&u=692377e91a2dab11006abb01d0db33cdb211c9b8&v=4|width=64) 
[![Build Status](https://travis-ci.org/xlab-tech/RxMap.svg?branch=master)](https://travis-ci.org/xlab-tech/RxMap)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fe06b87e1b6b4e279c8507c82d8ba73f)](https://www.codacy.com/project/xlab/RxMap/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=xlab-tech/RxMap&amp;utm_campaign=Badge_Grade_Dashboard)
[![Coverage Status](https://coveralls.io/repos/github/xlab-tech/RxMap/badge.svg?branch=master)](https://coveralls.io/github/xlab-tech/RxMap?branch=master)
[![dependencies Status](https://david-dm.org/xlab-tech/RxMap/status.svg)](https://david-dm.org/xlab-tech/RxMap)
[![devDependencies Status](https://david-dm.org/xlab-tech/RxMap/dev-status.svg)](https://david-dm.org/xlab-tech/RxMap?type=dev)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![AUR](https://img.shields.io/aur/license/yaourt.svg)](https://github.com/xlab-tech/RxMap/blob/master/LICENSE)

[![Slack Status](https://xlab-tech.slack.com/badge.svg)](https://join.slack.com/t/xlab-tech/shared_invite/enQtNDIwMzg1MTA2NjA5LTljZWNkZjliNjhhNTc4MTQ0OWVkNTAwMTE0NmU2YTllYTE5YzllZjM2NTQ1ZmNkMDRmMGI0NWE0NGRiZGIxNmE)

RxMap es una librería de mapas para programación funcional y reactiva usando observables([RxJs](https://github.com/ReactiveX/rxjs)) Y que permite fácilmente anidar llamadas asyncronas.

RxMap se basa en dos conceptos acciones y observadores para organizar tu código en pequeños bloques. Y también te permite escribir middlewares para desacoplar mejor tu código.

De facto incluye observables sobre las acciones y un store obsevable, para poder observar  los cambios sobre datos que guardes.

RxMap añade una capa de abstracción sobre las librerías de mapas, esta diseñada para desacoplarte i evitarte tener que actualizar tu código con cada cambio de librerías o utilizar una mapa diferente según el entorno. Podrás 
centrarte en desarrollar tus funcionalidades.

RxMap te permite cargar el código en diferido cuando la utilizas para mejorar los tiempos de carga, es recomendable desplegarlo en http2.

## Ventajas
* Cargar en diferido de las acciones y los observadores (Lazy Loader).
* Trabajar con observadores. (RxJs).
* Trabajar de manara asyncrona.
* Programación funcional.
* Store Observable.
* Trabaja con multiples mapas, sin cambiar tu código.
* Reutilización de código entre diferentes proyectos.

## Instalación

### NPM
```
Npm install @rxmap\rxmap —save
```

### CDN
```
<head>
<script type=‘application/javascript’ src=‘https://unpkg.com/@rxmap/rxmap@0.0.2’ defer/>
</head>

```

## Como utilizarla
Lo ideal es tener las acciones y los observadores en librerías externas, lo primero seria registrar estas librerías para poder utilizarlas

```
import rxLib from '@rxmap/rxmap/lib';
registerLib(...rxLib);

```

 Una vez registradas las librerías o las acciones a utilizar. Lo primero es cargar el mapa que se quiera utilizar 
Y después ya se pueden invocar las acciones o observadores a utilizar.

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

## Documentación

Puedes encontrar más Documentación aquí:
* [Overview](https://xlab-tech.github.io/RxMap/manual/overview.html)
* [Instalar](https://xlab-tech.github.io/RxMap/manual/install.html)
* [Como Utilizar](https://xlab-tech.github.io/RxMap/manual/howItWorks.html)
	* [Acciones](https://xlab-tech.github.io/RxMap/manual/howItWorks.html#acciones)
	* [Observadores](https://xlab-tech.github.io/RxMap/manual/howItWorks.html#observadores)
	* [Librerías](https://xlab-tech.github.io/RxMap/manual/howItWorks.html#librerías)
	* [Middlewares](https://xlab-tech.github.io/RxMap/manual/howItWorks.html#middlewares)
	* [Observar acciones](https://xlab-tech.github.io/RxMap/manual/howItWorks.html#observar-acciones)
	* [Store](https://xlab-tech.github.io/RxMap/manual/howItWorks.html#store-observable)
* [Como crear](https://xlab-tech.github.io/RxMap/manual/make.html)
	* [Acciones](https://xlab-tech.github.io/RxMap/manual/make.html#como-crear-acciones)
	* [Observadores](https://xlab-tech.github.io/RxMap/manual/make.html#como-crear-observadores)
	* [Middlewares](https://xlab-tech.github.io/RxMap/manual/make.html#como-crear-un-middleware)
	* [Librería](https://xlab-tech.github.io/RxMap/manual/make.html#como-crear-una-libreria)
* [Build](https://xlab-tech.github.io/RxMap/manual/build.html)


# Examples

# Librerias
Librerías para añadir acciones y observadores:
  * RxMapLib
	* .. 

Para añadir una nueva librería enviar un mail a rxmap@xlab-tech.com  o realiza un pullRequest de la documentación con la libreria añadida.
Para hacer un PullRequest:
  * Haz un fork del repositorio.
	* Haz commit y push de los cambios en tu reposition.
	* Crear un PullRequest . 