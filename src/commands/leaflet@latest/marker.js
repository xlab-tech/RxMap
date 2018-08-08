
import Map from './../../core/RxMap';
import L from 'leaflet'

const marker = function (options) {
    const { lat, lng, properties } = options;
    const map = this.getMap();
    const marker = L.marker([lat, lng]).addTo(map);
    marker.properties = properties;
    return marker;
};

Map.register('marker', marker);

