/* global describe,it */
import { expect } from 'chai';
import leafletPoint from '../../../lib/utils/transformPointLeaflet';
import googlePoint from '../../../lib/utils/transformPointGoogle';

describe('transformPoint', () => {
  describe('transformPoint Google', () => {
    it('err', () => {
      expect(googlePoint).to.throw();
    });
    it('err mandatory', () => {
      try {
        googlePoint({});
      } catch (err) {
        expect(err).to.instanceOf(Error);
      }
    });
    it('no mandatory', () => {
      const t = googlePoint({}, true);
      // eslint-disable-next-line no-unused-expressions
      expect(t).to.be.null;
    });
    it('array', () => {
      const p = googlePoint([1, 2]);
      expect(p).to.deep.eq({ lat: 1, lng: 2 });
    });
    it('latlng', () => {
      const p = googlePoint({ lat: 1, lng: 2 });
      expect(p).to.deep.eq({ lat: 1, lng: 2 });
    });
    it('latlon', () => {
      const p = googlePoint({ lat: 1, lon: 2 });
      expect(p).to.deep.eq({ lat: 1, lng: 2 });
    });
    it('latitudlongitud', () => {
      const p = googlePoint({ latitud: 1, longitud: 2 });
      expect(p).to.deep.eq({ lat: 1, lng: 2 });
    });
    it('latitudelongitude', () => {
      const p = googlePoint({ latitude: 1, longitude: 2 });
      expect(p).to.deep.eq({ lat: 1, lng: 2 });
    });
    it('position', () => {
      const p = googlePoint({ position: { latitude: 1, longitude: 2 } });
      expect(p).to.deep.eq({ lat: 1, lng: 2 });
    });
    it('location', () => {
      const p = googlePoint({ location: { latitude: 1, longitude: 2 } });
      expect(p).to.deep.eq({ lat: 1, lng: 2 });
    });
    it('center', () => {
      const p = googlePoint({ center: { latitude: 1, longitude: 2 } });
      expect(p).to.deep.eq({ lat: 1, lng: 2 });
    });
  });
  describe('transformPoint Leaflet', () => {
    it('err', () => {
      expect(leafletPoint).to.throw();
    });
    it('err mandatory', () => {
      try {
        leafletPoint({});
      } catch (err) {
        expect(err).to.instanceOf(Error);
      }
    });
    it('array', () => {
      const p = leafletPoint([1, 2]);
      expect(p).to.deep.eq([1, 2]);
    });
    it('latlng', () => {
      const p = leafletPoint({ lat: 1, lng: 2 });
      expect(p).to.deep.eq([1, 2]);
    });
    it('latlon', () => {
      const p = leafletPoint({ lat: 1, lon: 2 });
      expect(p).to.deep.eq([1, 2]);
    });
    it('latitudlongitud', () => {
      const p = leafletPoint({ latitud: 1, longitud: 2 });
      expect(p).to.deep.eq([1, 2]);
    });
    it('latitudelongitude', () => {
      const p = leafletPoint({ latitude: 1, longitude: 2 });
      expect(p).to.deep.eq([1, 2]);
    });
    it('position', () => {
      const p = leafletPoint({ position: { latitude: 1, longitude: 2 } });
      expect(p).to.deep.eq([1, 2]);
    });
    it('location', () => {
      const p = leafletPoint({ location: { latitude: 1, longitude: 2 } });
      expect(p).to.deep.eq([1, 2]);
    });
    it('center', () => {
      const p = leafletPoint({ center: { latitude: 1, longitude: 2 } });
      expect(p).to.deep.eq([1, 2]);
    });
    it('no mandatory', () => {
      const t = leafletPoint({}, true);
      // eslint-disable-next-line no-unused-expressions
      expect(t).to.be.null;
    });
  });
});
