import { loadCSS } from '../core/importLazyLoad';

const externMapLibrary = {};

export const addMapLibrary = (name, func) => {
  externMapLibrary[name] = func;
};

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
    const mapbox = await import(/* webpackChunkName: "mapbox" */'mapbox-gl');
    mapbox.default.accessToken = options.key;
    return mapbox;
  }

  if (lib === 'ol') {
    return import(/* webpackChunkName: "ol" */'ol');
  }

  if (lib === 'esri') {
    const esriLoader = await import(/* webpackChunkName: "esri" */'esri-loader');
    const loadScriptPromise = esriLoader.loadScript();
    await loadCSS('https://js.arcgis.com/4.9/esri/css/main.css');
    return loadScriptPromise.then(() => esriLoader);
  }
  if (lib === 'carto') {
    await loadCSS('https://unpkg.com/leaflet@1.3.4/dist/leaflet.css');
    const leaflet = await import(/* webpackChunkName: "leaflet" */'leaflet');
    const carto = await import(/* webpackChunkName: "carto" */'@carto/carto.js');
    const client = new carto.Client({
      apiKey: options.key,
      username: options.user,
    });
    return {
      leaflet, carto, client,
    };
  }
  if (externMapLibrary[lib]) {
    return externMapLibrary[lib](options);
  }
  throw new Error(`Library ${lib} not supported`);
};
