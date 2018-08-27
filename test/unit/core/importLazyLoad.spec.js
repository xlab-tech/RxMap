/* global describe,it */
import { expect } from 'chai';
import {
  loadLib,
  addImportFunction,
  loadCSS,
} from '../../../src/core/importLazyLoad';
import { registerCommand } from '../../../src/core/registerCommand';

describe('Import Lazy Load', function () {
  this.timeout(2000);
  it('load lib command define', async () => {
    addImportFunction('test', () => Promise.resolve({ default: 'ttt' }));
    registerCommand('test', () => 'aa');
    const res = await loadLib('test', 'leaflet', 'commands', { key: 'test', lib: 'test' });
    expect(res).to.eq('ttt');
  });
  it('load lib command rxmap', async () => {
    addImportFunction('rxmap', () => Promise.resolve({ default: () => 'aaa' }));
    const res = await loadLib('rxmap', 'leaflet', 'commands', 'create', 'latest');
    expect(res).to.be.a('function');
  });
  it('load lib command http', () => {
    const res = loadLib('rxmap', 'leaflet', 'commands', { key: 'test', path: 'test' });
    expect(res).to.be.a('promise');
  });
  it('load Css', async () => {
    document.styleSheets[-1] = { href: 'https://unpkg.com/leaflet@1.3.3/dist/leaflet.css' };
    const res = await loadCSS('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css');
    expect(res).to.be.a('HTMLLinkElement');
  });
});
