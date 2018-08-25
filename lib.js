// import { addImportFunction } from './src/core/importLazyLoad';

import { addImportFunction } from './dist/es2015/core/importLazyLoad';

addImportFunction('rxmap', arg => import(/* webpackMode: "lazy" */ `./dist/lib/${arg}`));
