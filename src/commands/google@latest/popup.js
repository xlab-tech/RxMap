// Create a marker and set its position.

import Map from '../../core/RxMap';
import getGoogleMap from '../../utils/google';

const popup = function (contentString) {
  const googleMaps = getGoogleMap();
  const map = this.getMap();
  const lastValue = this.value();
  const { value, name } = lastValue;
  if (name === 'marker') {
    const infowindow = new googleMaps.InfoWindow({
      content: contentString,
    });
    value.addListener('click', () => {
      infowindow.open(map, value);
    });
  } else if (name === 'addData') {
    value.forEach((element) => {
      const infoWindow = new googleMaps.InfoWindow({
        content: contentString,
      });
      element.addListener('click', () => {
        infoWindow.setPosition(element.getCenter());
        infoWindow.open(map);
      });
    });
  }
  return lastValue;
};

Map.register('popup', popup);
