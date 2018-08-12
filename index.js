import * as _register from './src/core/registerCommand';
import _RxMap from './src/RxMap';
import _RxDynamicMap from './src/RxDynamicMap';
import _RxMapFromConfig from './src/config';

export const { registerCommand, applyMiddlewares } = _register;
export const RxMap = _RxMap;
export const RxDynamicMap = _RxDynamicMap;
export const RxMapFromConfig = _RxMapFromConfig;
