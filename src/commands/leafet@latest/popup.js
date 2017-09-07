// Create a marker and set its position.

import Map from './../../core/Map.js';

const popup = function (contentString) {
    const map = this.getMap();

    const lastValue = this.value();
    const { value, name } = lastValue;
    if (name === 'marker') {
        value.bindPopup(contentString);
    }
    return lastValue;
};

Map.register('popup', popup);