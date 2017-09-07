import Map from './../../core/Map.js';

const googleMaps = google.maps;

const create = function (id, lat, lng, zoom) {
    const _map = new googleMaps.Map(document.getElementById(id), {
        center: { lat: lat, lng: lng },
        zoom: zoom
    });
    this.setMap(_map);
    return _map;
};

Map.register('create', create);
