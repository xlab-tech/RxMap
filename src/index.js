import * as _register from './core/registerCommand';
import * as _registerObserver from './core/registerObserver';
import * as _registerMiddleware from './core/middlewares';
import _RxMap from './RxMap';
import _RxMapFromConfig from './config';
import * as lazy from './core/importLazyLoad';

export const { registerCommand } = _register;
export const { registerObserver } = _registerObserver;
export const { registerMiddleware } = _registerMiddleware;
export const RxMap = _RxMap;
export const RxMapFromConfig = _RxMapFromConfig;
export const { addImportFunction } = lazy;

export default {
  registerCommand: _register.registerCommand,
  registerObserver: _registerObserver.registerObserver,
  registerMiddleware: _registerMiddleware.registerMiddleware,
  RxMap: _RxMap,
  RxMapFromConfig: _RxMapFromConfig,
  addImportFunction: lazy.addImportFunction,
};
