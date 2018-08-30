/* global describe,it */
import { expect } from 'chai';
import {
  loadLib,
  addImportFunction,
  loadCSS,
} from '../../../src/core/importLazyLoad';
import { registerAction } from '../../../src/core/registerAction';

describe('Import Lazy Load', function () {
  this.timeout(2000);
  it('load lib action define', async () => {
    addImportFunction('test', () => Promise.resolve({ default: 'ttt' }));
    registerAction('test', () => 'aa');
    const res = await loadLib('test', 'leaflet', 'actions', { key: 'test', lib: 'test' });
    expect(res).to.eq('ttt');
  });
  it('load lib action rxmap', async () => {
    addImportFunction('rxmap', () => Promise.resolve({ default: () => 'aaa' }));
    const res = await loadLib('rxmap', 'leaflet', 'actions', 'create', 'latest');
    expect(res).to.be.a('function');
  });
  it('load lib action http', () => {
    const res = loadLib('rxmap', 'leaflet', 'actions', { key: 'test', path: 'test' });
    expect(res).to.be.a('promise');
  });
  it('load Css', async () => {
    document.styleSheets[-1] = { href: 'https://unpkg.com/leaflet@1.3.3/dist/leaflet.css' };
    const res = await loadCSS('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css');
    expect(res).to.be.a('HTMLLinkElement');
  });
});
