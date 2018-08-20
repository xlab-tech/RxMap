import * as _register from './src/core/registerCommand';
import * as _registerObserver from './src/core/registerObserver';
import * as _registerMiddleware from './src/core/middlewares';
import _RxMap from './src/RxMap';
import _RxMapFromConfig from './src/config';
import * as lazy from './src/core/importLazyLoad';

export const { registerCommand } = _register;
export const { registerObserver } = _registerObserver;
export const { registerMiddleware } = _registerMiddleware;
export const RxMap = _RxMap;
export const RxMapFromConfig = _RxMapFromConfig;
export const { addImportFunction } = lazy;

const _R = {
  registerCommand,
  registerMiddleware,
  registerObserver,
  Map: RxMap,
  RxMapFromConfig,
  addImportFunction,
};

const _oldRxMap = window.RxMap;
export const noConflict = () => {
  window.RxMap = _oldRxMap;
  return _R;
};

// Always export us to window global
window.RxMap = _R;
