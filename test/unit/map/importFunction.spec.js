/* global describe,it */
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import '../../../src/importFunctions';
import { loadLib, loadAllRootLib } from '../../../src/core/importLazyLoad';

describe('addImport', () => {
  jsdom({
    url: 'https://example.org/',
  });
  it('import google', () => {
    let res;
    res = loadAllRootLib('google@latest');
    expect(res).to.be.a('promise');
    res = loadLib('google', 'commands', 'create');
    expect(res).to.be.a('promise');
    res = loadLib('google', 'commands', 'marker');
    expect(res).to.be.a('promise');
    res = loadLib('google', 'commands', 'popup');
    expect(res).to.be.a('promise');
    res = loadLib('google', 'commands', 'point');
    expect(res).to.be.a('promise');
    res = loadLib('google', 'commands', 'setCenter');
    expect(res).to.be.a('promise');
    res = loadLib('google', 'observers', 'gps');
    expect(res).to.be.a('promise');
    res = loadLib('google', 'observers', 'click');
    expect(res).to.be.a('promise');
    res = loadLib('google', 'observers', 'center');
    expect(res).to.be.a('promise');
    res = loadLib('common', 'commands', 'addData');
    expect(res).to.be.a('promise');
  });
  it('import leaflet', () => {
    let res;
    res = loadAllRootLib('leaflet@latest');
    expect(res).to.be.a('promise');
    res = loadLib('leaflet', 'commands', 'create');
    expect(res).to.be.a('promise');
    res = loadLib('leaflet', 'commands', 'marker');
    expect(res).to.be.a('promise');
    res = loadLib('leaflet', 'commands', 'popup');
    expect(res).to.be.a('promise');
    res = loadLib('leaflet', 'commands', 'point');
    expect(res).to.be.a('promise');
    res = loadLib('leaflet', 'commands', 'setCenter');
    expect(res).to.be.a('promise');
    res = loadLib('leaflet', 'observers', 'gps');
    expect(res).to.be.a('promise');
    res = loadLib('leaflet', 'observers', 'click');
    expect(res).to.be.a('promise');
    res = loadLib('leaflet', 'observers', 'center');
    expect(res).to.be.a('promise');
    res = loadLib('common', 'commands', 'addData');
    expect(res).to.be.a('promise');
  });
  it('import other', () => {
    const res = loadLib('leaflet', 'commands', 'test');
    expect(res).to.be.a('promise');
  });
});
