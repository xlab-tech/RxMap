import { RxMap, registerAction } from '../src/index';


registerAction('create', (context) => {
  const esriLoader = context.library;
  console.log(esriLoader);
  return esriLoader.loadModules(['esri/views/MapView', 'esri/Map'])
    .then(([MapView, Map]) => {
      const map = new Map({
        basemap: "streets"
      });

      const view = new MapView({
        container: "map",  // Reference to the DOM node that will contain the view
        map: map               // References the map object created in step 3
      });
      return map;
    })
    .catch(err => {
      // handle any errors
      console.error(err);
    });

});

const load = async () => {
  const map = await RxMap.load('esri');
  map.create();

};

load();
