import registerCommand from '../../core/registerCommand';
import getGoogleMap from '../../utils/google';

const create = (context, id, lat, lng, zoom) => {
  const googleMaps = getGoogleMap();
  const _map = new googleMaps.Map(document.getElementById(id), {
    center: { lat, lng },
    zoom,
  });
  context.RxMap.setMap(_map);
  return _map;
};

registerCommand('create', create);

export default create;
