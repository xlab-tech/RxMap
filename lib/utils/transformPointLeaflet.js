const leafletPoint = (item, noMandatory) => {
  if (!item) {
    throw new Error('Geometry Param is mandatory');
  }
  if (Array.isArray(item)) {
    return item;
  }
  if (item.lat && item.lng) {
    return [item.lat, item.lng];
  }
  if (item.lat && item.lon) {
    return [item.lat, item.lon];
  }
  if (item.latitude && item.longitude) {
    return [item.latitude, item.longitude];
  }
  if (item.latitud && item.longitud) {
    return [item.latitud, item.longitud];
  }
  if (item.position) {
    return leafletPoint(item.position);
  }
  if (item.location) {
    return leafletPoint(item.location);
  }
  if (item.center) {
    return leafletPoint(item.center);
  }
  if (noMandatory) {
    return null;
  }
  throw new Error('Geometry is mandatory');
};

export default leafletPoint;
