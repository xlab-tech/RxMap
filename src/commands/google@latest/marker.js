// Create a marker and set its position.

import Map from './../../core/Map.js';

const googleMaps = google.maps;

const marker = function (lat, lng) {
    const map = this.getMap();
    const myLatLng = {lat: lat, lng: lng};
    const marker = new googleMaps.Marker({
        map: map,
        position: myLatLng,
        //title: 'Hello World!'
      });
    return marker;
};

Map.register('marker', marker);
