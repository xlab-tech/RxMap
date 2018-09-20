/* global describe,it,before,after */
import { expect } from 'chai';
import sinon from 'sinon';
import * as GoogleMapsLoader from 'google-maps';
import importMapLibrary from '../../../src/map/importMapLibrary';
import * as loader from '../../../src/core/importLazyLoad';

describe('Import Map Library', function () {
  before(() => {
    sinon.stub(GoogleMapsLoader, 'load').callsFake(func => func({ maps: 5 }));
    sinon.stub(loader, 'loadCSS').callsFake(() => Promise.resolve());
  });
  after(() => {
    GoogleMapsLoader.load.restore();
    loader.loadCSS.restore();
    // stub.loadGoogle.restore();
    // stub.default.restore();
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
  it('Import Mapbox', async () => {
    window.URL.createObjectURL = () => { };
    const lib = await importMapLibrary('mapbox');
    expect(lib).to.be.a('object');
  });
  it('Import Error', (done) => {
    importMapLibrary('aa').catch(() => done());
  });
});
