/* global describe,it,afterEach,beforeEach */
import { expect } from 'chai';
import sinon from 'sinon';
import rxMap, { RxMap } from '../../../src/map/RxMap';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';
import { registerAction } from '../../../src/core/registerAction';
import * as load from '../../../src/core/importLazyLoad';
import * as loadMap from '../../../src/map/importMapLibrary';

describe('RxMap', () => {
  it('create new Map Instances', () => {
    const m = rxMap.init();
    expect(Map).to.be.not.equal(m);
  });
  it('actions return AsyncCommand', () => {
    registerAction('test', () => 'test');
    const ret = rxMap.test();
    expect(ret).to.be.an.instanceof(AsyncCommandBus);
  });
  it('getMap', () => {
    rxMap._sourceMap = 5;
    const res = rxMap.getMap();
    expect(res).to.eq(5);
  });
  it('dataType', () => {
    rxMap.setDataType('test', 'line', { a: 'aa' });
    expect(rxMap.getDataType('test').style).to.have.property('a');
  });
  it('getMapLibrary', () => {
    rxMap._nativeLibrary = 5;
    expect(rxMap.getMapLibrary()).to.eq(5);
    rxMap._nativeLibrary = null;
    window.L = 5;
    expect(rxMap.getMapLibrary()).to.eq(5);
    window.L = null;
    window.google = { maps: 5 };
    expect(rxMap.getMapLibrary().maps).to.eq(5);
  });
  it('load', async () => {
    try {
      await rxMap.load('tt');
    } catch (err) {
      expect(err).is.a.instanceOf(Error);
    }
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
      loadMap_.callsFake(() => Promise.resolve(5));
      load_ = sinon.stub(load, 'loadLib');
      load_.callsFake(() => Promise.resolve(() => 'aaaa'));
    });
    it('load', async () => {
      const ret = await rxMap.load('leaflet');
      expect(ret._nativeLibrary).to.eq(5);
      // console.log(ret);
    });
    it('load map ', async () => {
      registerAction('start', () => 6);
      const ret = await rxMap.load('leaflet');
      ret.start();
      setTimeout(() => {
        expect(ret._sourceMap).to.eq(6);
      }, 20);
      // console.log(ret);
    });
    it('load not', async () => {
      const ret = await rxMap.load('test');
      expect(ret._nativeLibrary).to.eq(5);
      // console.log(ret);
    });
    it('get getMapLibrary null', () => {
      rxMap._nativeLibrary = false;
      window.L = false;
      window.google = false;
      const m = rxMap.getMapLibrary();
      // eslint-disable-next-line no-unused-expressions
      expect(m).to.have.null;
    });
    it('new', () => {
      const m = new RxMap();
      expect(m).to.be.an.instanceof(RxMap);
    });
    it('observer Data', (done) => {
      const m = new RxMap();
      m.observerData('.').subscribe((data) => {
        expect(data.value).to.eq(5);
        done();
      });
      m.store.test = 5;
      // console.log(ret);
    });
  });
});
