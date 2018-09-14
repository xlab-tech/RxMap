import { take } from 'rxjs/internal/operators/take';
import rxMap from './RxMap';
import isPromise from '../utils/isPromise';

const rxMapFromConfig = async (id, config) => {
  const {
    type, map, options, dataTypes,
  } = config;
  const { center, zoom, autoCenter } = map;
  const mapCenter = center || { lat: 0, lng: 0 };

  await rxMap.load(type, options);

  const create = rxMap.create(id, mapCenter.lat, mapCenter.lng, zoom);

  if (isPromise(create)) {
    await new Promise(resolve => create.subscribe(data => resolve(data)));
  }

  if (autoCenter) {
    rxMap.observer('gps')
      .pipe(take(1))
      .setCenter(res => ({ lat: res.latitude, lng: res.longitude }))
      .subscribe();
  }
  if (dataTypes) {
    dataTypes.forEach(element => rxMap.setDataType(element.id, element.geomType, element.style));
  }

  return rxMap;
};

export default rxMapFromConfig;
