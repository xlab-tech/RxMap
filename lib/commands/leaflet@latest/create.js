
const create = (context, id, lat, lng, zoom) => {
  const L = context.library;
  const map = L.map(id).setView([lat, lng], zoom);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  return map;
};

export default create;
/**
 * @private
*/
export const name = 'create';
