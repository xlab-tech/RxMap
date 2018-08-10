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

const popup = function (content) {
  const map = this.getMap();
  const lastValue = this.value();
  const { value, name } = lastValue;
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
  return lastValue;
};

Map.register('popup', popup);

export default popup;
