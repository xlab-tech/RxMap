import { RxMap, registerAction } from '../src/index';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';

registerAction('create', (context) => {
  const ol = context.library;
  const map = new ol.Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
  });
  return map;
});

const load = async () => {
  const map = await RxMap.load('ol');
  map.create();

};

load();
