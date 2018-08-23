import { loadAllRootLib, loadCSS } from './importLazyLoad';

export default async (lib, options = {}) => {
  const version = options.version || 'latest';
  if (lib === 'leaflet') {
    loadCSS('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css');
    const _lib = await import(/* webpackChunkName: "leaflet" */'leaflet');
    if (!options.noLoadCommands) {
      await loadAllRootLib(`leaflet@${version}`);
    }
    return _lib;
  }

  if (lib === 'google') {
    const { loadGoogle } = await import(/* webpackChunkName: "google" */'../utils/google');
    const _lib = await loadGoogle(options.key);
    if (!options.noLoadCommands) {
      await loadAllRootLib(`google@${version}`);
    }
    return _lib;
  }
  throw new Error(`Library ${lib} not supported`);
};
