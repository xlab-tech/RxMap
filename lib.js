// import { addImportFunction } from './src/core/importLazyLoad';

import { addImportFunction } from './dist/esm/core/importLazyLoad';

addImportFunction('rxmap', arg => import(/* webpackMode: "lazy" */ `./dist/lib/${arg}`));
