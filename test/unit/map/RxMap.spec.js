/* global describe,it,afterEach,beforeEach */
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import sinon from 'sinon';
import RxMap from '../../../src/RxMap';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';
import { registerCommand } from '../../../src/core/registerCommand';
import * as load from '../../../src/core/importLazyLoad';
import * as loadMap from '../../../src/core/importMapLibrary';

describe('RxMap', () => {
  jsdom({
    url: 'https://example.org/',
  });
  it('create new Map Instances', () => {
    const m = RxMap.init();
    expect(Map).to.be.not.equal(m);
  });
  it('commands return AsyncCommand', () => {
    registerCommand('test', () => 'test');
    expect(RxMap).to.respondTo('test');
    const ret = RxMap.test();
    expect(ret).to.be.an.instanceof(AsyncCommandBus);
  });
  it('setMap, getMap', () => {
    RxMap.setMap(5);
    const res = RxMap.getMap();
    expect(res).to.eq(5);
  });
  it('dataType', () => {
    RxMap.setDataType('test', 'line', { a: 'aa' });
    expect(RxMap.getDataType('test').style).to.have.property('a');
  });
  it('add import Lib', () => {
    const f = () => 'ff';
    RxMap.addImportLib('kk', f);
    expect(RxMap._importLib.kk).to.eq(f);
    delete RxMap._importLib.kk;
  });
  it('getMapLibrary', () => {
    RxMap._nativeLibrary = 5;
    expect(RxMap.getMapLibrary()).to.eq(5);
    RxMap._nativeLibrary = null;
    window.L = 5;
    expect(RxMap.getMapLibrary()).to.eq(5);
    window.L = null;
    window.google = { maps: 5 };
    expect(RxMap.getMapLibrary().maps).to.eq(5);
  });
  describe('loads', () => {
    let load_;
    let loadMap_;
    afterEach(() => {
      loadMap_.restore();
      load_.restore();
    });
    beforeEach(() => {
      loadMap_ = sinon.stub(loadMap, 'default');
      loadMap_.callsFake(() => {
        console.log('MOCK MAP');
        return Promise.resolve(5);
      });
      load_ = sinon.stub(load, 'loadLib');
      load_.callsFake(() => Promise.resolve(() => 'aaaa'));
    });
    it('load', async () => {
      const ret = await RxMap.load('leaflet');
      expect(ret._nativeLibrary).to.eq(5);
      console.log(ret);
    });
    it('load commands', async () => {
      const ret = await RxMap.load('leaflet', { commands: [{ key: 'create' }], observers: ['click'] });
      expect(ret._nativeLibrary).to.eq(5);
      console.log(ret);
    });
    it('load commands defer', async () => {
      const ret = await RxMap.load('leaflet', { commands: [{ key: 'create' }], observers: [{ key: 'click' }], defer: true });
      expect(ret._nativeLibrary).to.eq(5);
      RxMap.create();
      console.log(ret);
    });
    it('load commands defer', async () => {
      const ret = await RxMap.load('leaflet', { commands: ['create'], observers: ['click'], defer: true });
      expect(ret._nativeLibrary).to.eq(5);
      RxMap.observer('click').subscribe();
      console.log(ret);
    });
  });
});
