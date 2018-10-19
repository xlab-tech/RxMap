import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { addImportFunction, loadLib } from './importLazyLoad';
import { registerObserver } from './registerObserver';
import { registerAction } from './registerAction';
import { registerFunction } from './resgisterFunction';

/**
 * Funcion que permite registrar librerias de Comandos y Observadores
 *
 * Solo se registran los comamdos y los observadores que se pasen en los parametros, si ya existiera
 * un comando o observador con el mismo nombre lo sobreescribiria.
 *
 * La funcion recibira los parametros ( type, mapLib, version, key ) para indicar lo que se quiere
 * recuperar. Y tiene que devolver de manera asyncrona( async, promise ) un objeto con la funcion del comando o
 * el observador el valor "default" o en el valor del nombre del comando o observador.
 * Esta funcion tiene que cargar el codigo en la aplicación la manera más aconsejado es con un
 * import dynamico
 *
 * @example
 * Ejemplo de Funcion import dinamico
 * (type, mapLib, version, key) => import( `../lib/${type}/${mapLib}@${version}/${key}`));
 *
 * @param {string} name Nombre de la libreria a registrar
 * @param {object{actions:Array,observers:Array}} options Lista de comandos y Observadores de la lirberia
 * @param {Function(name:string)} func Funcion que se utilizara para cargar dynamicamente los comados y los Observadores
 */
const registerLib = (name, options, func) => {
  addImportFunction(name, func);
  const actions = options.actions || [];
  const observers = options.observers || [];
  const functions = options.functions || [];

  functions.forEach((key) => {
    registerFunction(key, (context) => {
      const res = loadLib(name, null, 'functions', key, null);
      return (...args) => res.then(_func => _func(context)(...args));
    });
  });

  actions.forEach((key) => {
    registerAction(key, (context) => {
      // TODO: buscar una manera de pasar estos datos para desacoplar el mapa
      const lib = context.source.libName;
      const version = context.source.libVersion;
      const res = loadLib(name, lib, 'actions', key, version);
      return (...args) => res.then(action => action(context)(...args));
    });
  });

  observers.forEach((key) => {
    registerObserver(key, (context) => {
      // TODO: buscar una manera de pasar estos datos para desacoplar el mapa
      const lib = context.source.libName;
      const version = context.source.libVersion;
      return (...args) => from(loadLib(name, lib, 'observers', key, version))
        .pipe(switchMap(observer => observer(context)(...args)));
    });
  });
};

export default registerLib;
