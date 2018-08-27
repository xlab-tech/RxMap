
import { addImportFunction } from './dist/esm/core/importLazyLoad';

addImportFunction('rxmap', (type, mapLib, version, key) => import(/* webpackMode: "lazy" */ `./dist/lib/${type}/${mapLib}@${version}/${key}`));

/*
export default {
  observers: ['gps', 'center', 'click'],
  commands: ['addData', 'create', 'marker', 'point', 'popup', 'setCenter'],
};
*/
