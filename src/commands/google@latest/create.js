import Map from '../../core/RxMap';
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

Map.register('create', create);

export default create;
