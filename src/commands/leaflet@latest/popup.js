
import Map from '../../core/RxMap';

const addPopup = (marker, content) => {
  const { properties } = marker;
  let contentString = content;
  if (typeof content === 'function') {
    contentString = content(properties);
  }
  marker.bindPopup(contentString);
};

const popup = function (content) {
  const lastValue = this.value();
  const { value, name } = lastValue;
  if (name === 'marker') {
    addPopup(value, content);
  } else if (name === 'addData') {
    value.forEach(marker => addPopup(marker, content));
  }
  return lastValue;
};

Map.register('popup', popup);

export default popup;
