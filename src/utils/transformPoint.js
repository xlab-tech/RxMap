export const googlePoint = (item) => {
  if (!item) {
    throw new Error('Geometry is mandatory');
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
  throw new Error('Geometry is mandatory');
};

export const leafletPoint = (item) => {
  if (!item) {
    throw new Error('Geometry is mandatory');
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
  throw new Error('Geometry is mandatory');
};
