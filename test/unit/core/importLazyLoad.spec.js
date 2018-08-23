/* global describe,it */
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import {
  loadAllRootLib,
  loadLib,
  addImportFunction,
  loadCSS,
} from '../../../src/core/importLazyLoad';
import { registerCommand } from '../../../src/core/registerCommand';

describe('Import Lazy Load', function () {
  jsdom({
    url: 'https://example.org/',
  });
  this.timeout(2000);
  it('addImportFunction', () => {
    let test;
    addImportFunction('test', () => {
      test = 'aaa';
    });
    loadAllRootLib('leaflet@latest');
    expect(test).to.eq('aaa');
  });
  it('load lib command define', async () => {
    addImportFunction('test', () => Promise.resolve({ default: 'ttt' }));
    registerCommand('test', () => 'aa');
    const res = await loadLib('test', 'commands', { key: 'test', lib: 'test' });
    expect(res).to.eq('ttt');
  });
  it('load lib command rxmap', async () => {
    const res = await loadLib('leaflet', 'commands', 'create', 'latest');
    expect(res).to.be.a('function');
  });
  it('load lib command http', () => {
    const res = loadLib('test', 'commands', { key: 'test', path: 'test' });
    expect(res).to.be.a('promise');
  });
  it('load lib common rxmap', async () => {
    const res = await loadLib('leaflet', 'observers', 'gps', 'latest');
    expect(res).to.be.a('function');
  });
  it('load Css', async () => {
    document.styleSheets[-1] = { href: 'https://unpkg.com/leaflet@1.3.3/dist/leaflet.css' };
    const res = await loadCSS('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css');
    expect(res).to.be.a('HTMLLinkElement');
  });
});
