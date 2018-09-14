# Overview
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