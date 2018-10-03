import { RxMap, registerAction } from '../src/index';

registerAction('create', context => () => {

  const L = context.library.leaflet;
  const carto = context.library.carto;
  const client = context.library.client;
  const map = L.map('map').setView([0, 0], 5);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  const source = new carto.source.Dataset(`
  ne_10m_populated_places_simple
`);
  const style = new carto.style.CartoCSS(`
  #layer {
    marker-width: 7;
    marker-fill: #EE4D5A;
    marker-line-color: #FFFFFF;
  }
`);
  const layer = new carto.layer.Layer(source, style);

  client.addLayer(layer);
  client.getLeafletLayer().addTo(map);
  return map;

});

const load = async () => {
  const map = await RxMap.load('carto', { key: process.env.CARTO_TOKEN, user: process.env.CARTO_USER });
  map.create();

};

load();
