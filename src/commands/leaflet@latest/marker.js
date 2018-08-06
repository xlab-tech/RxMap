
import Map from './../../core/RxMap';
import L from 'leaflet'

const marker = function (options) {
    const { lat, lng } = options;
    const map = this.getMap();
    const marker = L.marker([lat, lng]).addTo(map);
    return marker;
};

Map.register('marker', marker);

