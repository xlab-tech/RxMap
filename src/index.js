import * as _register from './core/registerCommand';
import * as _registerObserver from './core/registerObserver';
import * as _registerMiddleware from './core/middlewares';
import * as _RxMap from './RxMap';
import _RxMapFromConfig from './config';
import * as lazy from './core/importLazyLoad';

/**
 * @type {registerCommand}
 */
export const { registerCommand } = _register;
/**
 * @type {registerObserver}
 */
export const { registerObserver } = _registerObserver;
/**
 * @type {registerMiddleware}
 */
export const { registerMiddleware } = _registerMiddleware;
/**
 * @type {RxMap} Instancia
 * objeto instanciado
 */
export const RxMap = _RxMap.default;
/**
 * @type {RxMap} Clase
 */
export const { RxMapClass } = _RxMap.RxMap;
/**
 * @type {RxMapFromConfig}
 */
export const RxMapFromConfig = _RxMapFromConfig;
/**
 * @type {addImportFunction}
 */
export const { addImportFunction } = lazy;

export default {
  registerCommand: _register.registerCommand,
  registerObserver: _registerObserver.registerObserver,
  registerMiddleware: _registerMiddleware.registerMiddleware,
  RxMap: _RxMap.default,
  RxMapClass: _RxMap.RxMap,
  RxMapFromConfig: _RxMapFromConfig,
  addImportFunction: lazy.addImportFunction,
};
