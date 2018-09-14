# Build
Para poder realizar la construcción del bundle de manera correcta, se necesita utilizar webPack por desgracia actualmente ni Rollup ni Parcel funciona correctamente con los imports dinámicos, esperamos que esto cambien en breve.

Para realizar el build con Angular, si queremos disponer de la carga dinamica, hay que modificar los siguientes parámetros.

	* En el fichero tsconfig.app.json hay que poner el valor ‘module’ a ‘esnext’

