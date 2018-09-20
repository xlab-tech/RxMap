
import rxMap from './RxMap';
import isPromise from '../utils/isPromise';

const rxMapFromConfig = async (id, config) => {
  const {
    type, map, options, dataTypes, actions,
  } = config;
  const { center, zoom } = map;
  const mapCenter = center || { lat: 0, lng: 0 };

  await rxMap.load(type, options);

  const create = rxMap.create(id, mapCenter.lat, mapCenter.lng, zoom);

  if (isPromise(create)) {
    await new Promise(resolve => create.subscribe(data => resolve(data)));
  }

  if (actions) {
    actions.forEach((action) => {
      if (Array.isArray(action)) {
        action.reduce((item, data) => item[data.name](...data.params), rxMap);
      } else {
        rxMap[action.name](...action.params);
      }
    });
  }

  if (dataTypes) {
    dataTypes.forEach(element => rxMap.setDataType(element.id, element.geomType, element.style));
  }

  return rxMap;
};

export default rxMapFromConfig;
