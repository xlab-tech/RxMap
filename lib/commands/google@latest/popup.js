// Create a marker and set its position.

import { registerCommand } from '../../../src/core/registerCommand';

const addPopup = (googleMaps, marker, content) => {
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
  const googleMaps = context.library.maps;
  const map = context.RxMap.getMap();
  const { value, name } = context.lastExecution;
  if (name === 'marker') {
    const infowindow = addPopup(googleMaps, value, content);
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

registerCommand('popup', popup);

export default popup;
