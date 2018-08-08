// Create a marker and set its position.

import Map from '../../core/RxMap';

const popup = function (contentString) {
  const lastValue = this.value();
  const { value, name } = lastValue;
  if (name === 'marker') {
    value.bindPopup(contentString);
  } else if (name === 'addData') {
    value.forEach(element => element.bindPopup(contentString));
  }
  return lastValue;
};

Map.register('popup', popup);
