/* global describe,it,after,before */
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';

describe('google', () => {
  jsdom({
    url: 'https://example.org/',
  });
  let GoogleMapsLoader;
  let google;
  before(async () => {
    GoogleMapsLoader = await import('google-maps');
    GoogleMapsLoader.isLoaded = false;
    GoogleMapsLoader.default.load = f => f({ maps: 5 });
    google = await import('../../../src/utils/google');
  });

  after(() => {
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
