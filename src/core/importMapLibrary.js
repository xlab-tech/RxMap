import { loadAllRootLib, loadCSS } from './importLazyLoad';
import { registerCommand } from './registerCommand';
import { registerObserver } from './registerObserver';

const loadAll = async (name) => {
  const register = await loadAllRootLib(name);
  if (register && register[0] && register[0].default) {
    register[0].default(registerCommand, registerObserver);
  }
};

export default async (lib, options = {}) => {
  const version = options.version || 'latest';
  if (lib === 'leaflet') {
    loadCSS('https://unpkg.com/leaflet@1.3.4/dist/leaflet.css');
    const _lib = await import(/* webpackChunkName: "leaflet" */'leaflet');
    if (!options.noLoadCommands) {
      await loadAll(`leaflet@${version}`);
    }
    return _lib;
  }

  if (lib === 'google') {
    const { loadGoogle } = await import(/* webpackChunkName: "google" */'../utils/google');
    const _lib = await loadGoogle(options.key);
    if (!options.noLoadCommands) {
      await loadAll(`google@${version}`);
    }
    return _lib;
  }
  throw new Error(`Library ${lib} not supported`);
};
