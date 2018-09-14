import './utils/polyfill';
import * as _register from './core/registerAction';
import * as _registerObserver from './core/registerObserver';
import * as _registerMiddleware from './core/middlewares';
import * as _RxMap from './map/RxMap';
import _RxMapFromConfig from './map/config';
import _registerLib from './core/registerLib';

/**
 * @type {registerAction}
 */
export const { registerAction } = _register;
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
 * @type {registerLib}
 */
export const registerLib = _registerLib;

export default {
  registerAction,
  registerObserver,
  registerMiddleware,
  registerLib,
  RxMap,
  RxMapClass,
  RxMapFromConfig,
};
