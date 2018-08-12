import { registerCommand } from '../../../src/core/registerCommand';

const create = (context, id, lat, lng, zoom) => {
  const googleMaps = context.library.maps;
  const _map = new googleMaps.Map(document.getElementById(id), {
    center: { lat, lng },
    zoom,
  });
  context.RxMap.setMap(_map);
  return _map;
};

registerCommand('create', create);

export default create;
