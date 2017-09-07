
import Map from './../../core/Map.js';

const L = window.L;

const marker = function (lat, lng) {
    const map = this.getMap();
    const marker = L.marker([lat, lng]).addTo(map);
    /*return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            
            resolve(marker);

        },4000);
    })*/
    return marker;
};

Map.register('marker', marker);
