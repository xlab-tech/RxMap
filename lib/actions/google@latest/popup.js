// Create a marker and set its position.

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
  const map = context.source.getMap();
  const { value, name } = context.lastExecution;
  if (name === 'marker') {
    const infowindow = addPopup(googleMaps, value, content);
    value.addListener('click', () => {
      infowindow.open(map, value);
    });
  } else if (name === 'addData') {
    value.forEach((marker) => {
      const infoWindow = addPopup(googleMaps, marker, content);
      marker.addListener('click', () => {
        infoWindow.setPosition(marker.getCenter());
        infoWindow.open(map);
      });
    });
  }
  return context.lastExecution.value;
};

export default popup;
/**
 * @private
*/
export const name = 'popup';
