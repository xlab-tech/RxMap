/* global describe,it,before,after */
import { expect } from 'chai';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom';

import importMapLibrary from '../../../src/core/importMapLibrary';


describe('Import Map Library', function () {
  jsdom({
    url: 'https://example.org/',
  });
  let GoogleMapsLoader;
  before(async () => {
    GoogleMapsLoader = await import('google-maps');
    sinon.stub(GoogleMapsLoader, 'load').callsFake(func => func());
  });
  after(() => {
    GoogleMapsLoader.load.restore();
  });
  this.timeout(2000);
  it('Import Google', async () => {
    const lib = importMapLibrary('google', { key: 'ddd' });
    expect(lib).to.be.a('promise');
  });
  it('Import Leaflet', async () => {
    const lib = await importMapLibrary('leaflet');
    expect(lib).to.be.a('object');
  });
  it('Import Error', (done) => {
    importMapLibrary('aa').catch(() => done());
  });
});
