// Create a marker and set its position.

import Map from '../../core/RxMap';
import getGoogleMap from '../../utils/google';

const addPopup = (marker, content) => {
  const googleMaps = getGoogleMap();
  const { properties } = marker;
  let contentString = content;
  if (typeof content === 'function') {
    contentString = content(properties);
  }
  return new googleMaps.InfoWindow({
    content: contentString,
  });
};

const popup = (context, content) => {
  const map = context.RxMap.getMap();
  const { value, name } = context.lastExecution;
  if (name === 'marker') {
    const infowindow = addPopup(value, content);
    value.addListener('click', () => {
      infowindow.open(map, value);
    });
  } else if (name === 'addData') {
    value.forEach((marker) => {
      const infoWindow = addPopup(marker, content);
      marker.addListener('click', () => {
        infoWindow.setPosition(marker.getCenter());
        infoWindow.open(map);
      });
    });
  }
  return context.lastExecution;
};

Map.register('popup', popup);

export default popup;
