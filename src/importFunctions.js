import { addImportFunction } from './core/importLazyLoad';

// TODO: hacer una funcion con webpack que cree esto
// const _fixedImports = () => ({
//   'google@latest': () => import(/* webpackChunkName: "google@latest" */'../lib/google@latest'),
//   'leaflet@latest': () => import(/* webpackChunkName: "leaflet@latest" */'../lib/leaflet@latest'),
//   'commands/google@latest/create': () => import('../lib/commands/google@latest/create'),
//   'commands/google@latest/marker': () => import('../lib/commands/google@latest/marker'),
//   'commands/google@latest/popup': () => import('../lib/commands/google@latest/popup'),
//   'commands/google@latest/point': () => import('../lib/commands/google@latest/point'),
//   'commands/google@latest/setCenter': () => import('../lib/commands/google@latest/setCenter'),
//   'observers/google@latest/center': () => import('../lib/observers/google@latest/center'),
//   'observers/google@latest/click': () => import('../lib/observers/google@latest/click'),
//   'commands/google@latest/addData': () => import('../lib/commands/google@latest/addData'),
//   'observers/google@latest/gps': () => import('../lib/observers/google@latest/gps'),
//   'commands/leaflet@latest/addData': () => import('../lib/commands/leaflet@latest/addData'),
//   'observers/leaflet@latest/gps': () => import('../lib/observers/leaflet@latest/gps'),
//   'commands/leaflet@latest/create': () => import('../lib/commands/leaflet@latest/create'),
//   'commands/leaflet@latest/marker': () => import('../lib/commands/leaflet@latest/marker'),
//   'commands/leaflet@latest/popup': () => import('../lib/commands/leaflet@latest/popup'),
//   'commands/leaflet@latest/setCenter': () => import('../lib/commands/leaflet@latest/setCenter'),
//   'commands/leaflet@latest/point': () => import('../lib/commands/leaflet@latest/point'),
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

addImportFunction('rxmap', arg => import(/* webpackMode: "lazy" */ `../lib/${arg}`));
