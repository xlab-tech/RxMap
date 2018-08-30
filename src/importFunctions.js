import { addImportFunction } from './core/importLazyLoad';

// TODO: hacer una funcion con webpack que cree esto
// const _fixedImports = () => ({
//   'google@latest': () => import(/* webpackChunkName: "google@latest" */'../lib/google@latest'),
//   'leaflet@latest': () => import(/* webpackChunkName: "leaflet@latest" */'../lib/leaflet@latest'),
//   'actions/google@latest/create': () => import('../lib/actions/google@latest/create'),
//   'actions/google@latest/marker': () => import('../lib/actions/google@latest/marker'),
//   'actions/google@latest/popup': () => import('../lib/actions/google@latest/popup'),
//   'actions/google@latest/point': () => import('../lib/actions/google@latest/point'),
//   'actions/google@latest/setCenter': () => import('../lib/actions/google@latest/setCenter'),
//   'observers/google@latest/center': () => import('../lib/observers/google@latest/center'),
//   'observers/google@latest/click': () => import('../lib/observers/google@latest/click'),
//   'actions/google@latest/addData': () => import('../lib/actions/google@latest/addData'),
//   'observers/google@latest/gps': () => import('../lib/observers/google@latest/gps'),
//   'actions/leaflet@latest/addData': () => import('../lib/actions/leaflet@latest/addData'),
//   'observers/leaflet@latest/gps': () => import('../lib/observers/leaflet@latest/gps'),
//   'actions/leaflet@latest/create': () => import('../lib/actions/leaflet@latest/create'),
//   'actions/leaflet@latest/marker': () => import('../lib/actions/leaflet@latest/marker'),
//   'actions/leaflet@latest/popup': () => import('../lib/actions/leaflet@latest/popup'),
//   'actions/leaflet@latest/setCenter': () => import('../lib/actions/leaflet@latest/setCenter'),
//   'actions/leaflet@latest/point': () => import('../lib/actions/leaflet@latest/point'),
//   'observers/leaflet@latest/center': () => import('../lib/observers/leaflet@latest/center'),
//   'observers/leaflet@latest/click': () => import('../lib/observers/leaflet@latest/click'),
// });

// addImportFunction('rxmap', (arg) => {
//   // HACK for dynamic import. The build system except latest version of webpack need all path for create bundles.
//   const f = _fixedImports()[arg];
//   if (f) {
//     return f();
//   }
//   return import(/* webpackMode: "lazy" */ `../lib/${arg}`);
// });

addImportFunction('rxmap', (type, mapLib, version, key) => import(/* webpackMode: "lazy" */ `../lib/${type}/${mapLib}@${version}/${key}`));
