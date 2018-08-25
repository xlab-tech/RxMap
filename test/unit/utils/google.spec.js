/* global describe,it,after,before */
import { expect } from 'chai';
import * as GoogleMapsLoader from 'google-maps';
import * as google from '../../../src/utils/google';

describe('google', () => {
  before(async () => {
    GoogleMapsLoader.isLoaded = false;
    GoogleMapsLoader.default.load = f => f({ maps: 5 });
  });

  after(() => {
    // stub.restore();
    // google.default.restore();
    // GoogleMapsLoader.load.restore();
  });

  it('load Google', () => {
    const g = google.loadGoogle('444');
    return g.then((res) => {
      expect(res.maps).to.eq(5);
    });
  });

  it('get google', () => {
    const g = google.default();
    expect(g).to.eq(5);
  });
});
