const googlePoint = (item, noMandatory) => {
  if (!item) {
    throw new Error('Geometry Param is mandatory');
  }
  if (Array.isArray(item)) {
    return { lat: item[0], lng: item[1] };
  }
  if (item.lat && item.lng) {
    return item;
  }
  if (item.lat && item.lon) {
    return { lat: item.lat, lng: item.lon };
  }
  if (item.latitude && item.longitude) {
    return { lat: item.latitude, lng: item.longitude };
  }
  if (item.latitud && item.longitud) {
    return { lat: item.latitud, lng: item.longitud };
  }
  if (item.position) {
    return googlePoint(item.position);
  }
  if (item.location) {
    return googlePoint(item.location);
  }
  if (item.center) {
    return googlePoint(item.center);
  }
  if (noMandatory) {
    return null;
  }
  throw new Error('Geometry is mandatory');
};

export default googlePoint;
