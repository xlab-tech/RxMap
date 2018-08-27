/* global describe,it */
import { expect } from 'chai';
// import '../../../src/importFunctions';
import { loadLib } from '../../../src/core/importLazyLoad';

describe('addImport', () => {
  it('import google', () => {
    let res;
    res = loadLib('rxmap', 'google', 'commands', 'create');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'commands', 'marker');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'commands', 'popup');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'commands', 'point');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'google', 'commands', 'setCenter');
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
    res = loadLib('rxmap', 'leaflet', 'commands', 'create');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'commands', 'marker');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'commands', 'popup');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'commands', 'point');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'commands', 'setCenter');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'observers', 'gps');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'observers', 'click');
    expect(res).to.be.a('promise');
    res = loadLib('rxmap', 'leaflet', 'observers', 'center');
    expect(res).to.be.a('promise');
  });
  it('import other', () => {
    const res = loadLib('rxmap', 'leaflet', 'commands', 'test');
    expect(res).to.be.a('promise');
  });
});
