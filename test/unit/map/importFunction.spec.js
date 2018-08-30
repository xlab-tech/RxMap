/* global describe,it */
import { expect } from 'chai';
// import '../../../src/importFunctions';
import { loadLib } from '../../../src/core/importLazyLoad';

describe('addImport', () => {
  it('import google', () => {
    let res;
    res = loadLib('rxmap', 'google', 'actions', 'create');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'actions', 'marker');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'actions', 'popup');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'actions', 'point');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'actions', 'setCenter');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'observers', 'gps');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'observers', 'click');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'observers', 'center');
    expect(res).to.be.a('promise');
  });
  it('import leaflet', () => {
    let res;
    res = loadLib('rxmap', 'leaflet', 'actions', 'create');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'actions', 'marker');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'actions', 'popup');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'actions', 'point');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'actions', 'setCenter');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'observers', 'gps');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'observers', 'click');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'observers', 'center');
    expect(res).to.be.a('promise');
  });
  it('import other', () => {
    const res = loadLib('rxmap', 'leaflet', 'actions', 'test');
    expect(res).to.be.a('promise');
  });
});
