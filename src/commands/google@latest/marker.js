// Create a marker and set its position.

import Map from './../../core/RxMap';
import getGoogleMap from './../../utils/google';

const marker = function (options) {
    const googleMaps = getGoogleMap();
    const map = this.getMap();
    const { lat, lng } = options;
    const myLatLng = { lat, lng };
    const marker = new googleMaps.Marker({
        map: map,
        position: myLatLng,
    });
    return marker;
};

Map.register('marker', marker);
