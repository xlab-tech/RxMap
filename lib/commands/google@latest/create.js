
const create = (context, id, lat, lng, zoom) => {
  const googleMaps = context.library.maps;
  const _map = new googleMaps.Map(document.getElementById(id), {
    center: { lat, lng },
    zoom,
  });
  return _map;
};

export default create;
/**
 * @private
*/
export const name = 'create';
