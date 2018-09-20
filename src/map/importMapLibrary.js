import { loadCSS } from '../core/importLazyLoad';

export default async (lib, options = {}) => {
  // const version = options.version || 'latest';
  if (lib === 'leaflet') {
    await loadCSS('https://unpkg.com/leaflet@1.3.4/dist/leaflet.css');
    return import(/* webpackChunkName: "leaflet" */'leaflet');
  }

  if (lib === 'google') {
    const { loadGoogle } = await import(/* webpackChunkName: "google" */'../utils/google');
    return loadGoogle(options.key);
  }

  if (lib === 'mapbox') {
    const mapbox = await import(/* webpackChunkName: "mapboxGl" */'mapbox-gl');
    mapbox.default.accessToken = options.key;
    return mapbox;
  }

  if (lib === 'ol') {
    return import(/* webpackChunkName: "ol" */'ol');
  }
  throw new Error(`Library ${lib} not supported`);
};
