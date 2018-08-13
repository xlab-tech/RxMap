import * as _register from './src/core/registerCommand';
import * as _registerObserver from './src/core/registerObserver';
import _RxMap from './src/RxMap';
import _RxMapFromConfig from './src/config';

export const { registerCommand, applyMiddlewares } = _register;
export const { registerObserver } = _registerObserver;
export const RxMap = _RxMap;
export const RxMapFromConfig = _RxMapFromConfig;

const _R = {
  registerCommand,
  applyMiddlewares,
  registerObserver,
  Map: RxMap,
  RxMapFromConfig,
};

const _oldRxMap = window.RxMap;
export const noConflict = () => {
  window.RxMap = _oldRxMap;
  return _R;
};

// Always export us to window global
window.RxMap = _R;
