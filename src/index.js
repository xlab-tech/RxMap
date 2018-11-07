import { start, addStatic, addLayer } from '@rxmap/offlinestorage';
import './utils/polyfill';
import * as _register from './core/registerAction';
import * as _registerFunction from './core/resgisterFunction';
import * as _registerObserver from './core/registerObserver';
import * as _registerMiddleware from './core/middlewares';
import * as _RxMap from './map/RxMap';
import _RxMapFromConfig from './map/config';
import _registerLib from './core/registerLib';
import * as _middlewares from './map/middlewares/logger';
import * as _mapLibray from './map/importMapLibrary';
import { getSrc, getPath } from './utils/getPath';

/**
 * @type {registerAction}
 */
export const { registerFunction } = _registerFunction;

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
export const RxMapClass = _RxMap.RxMap;
/**
 * @type {RxMapFromConfig}
 */
export const RxMapFromConfig = _RxMapFromConfig;
/**
 * @type {registerLib}
 */
export const registerLib = _registerLib;

export const middlewares = _middlewares;

export const { addMapLibrary } = _mapLibray;

export const offiline = { addStatic, addLayer };

export default {
  registerFunction,
  registerAction,
  registerObserver,
  registerMiddleware,
  registerLib,
  RxMap,
  RxMapClass,
  RxMapFromConfig,
  middlewares,
  addMapLibrary,
  offiline,
};
const fileSrc = getSrc();

addStatic(/(.+|)chunk.+.(js|css)$/);
addStatic(fileSrc);
start(getPath());
