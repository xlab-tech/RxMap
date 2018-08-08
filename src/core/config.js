import { take } from 'rxjs/internal/operators/take';
import RxDynamicMap from './RxDynamicMap';

const mandatoryCommands = ['create'];
const mandatoryObservers = [];

const RxMapFromConfig = async (id, config) => {
  const {
    type, commands, observers, map, options, dataTypes,
  } = config;
  const { center, zoom, autoCenter } = map;
  const mapCenter = center || { lat: 0, lng: 0 };

  let allComands = commands.concat(mandatoryCommands);
  allComands = allComands.filter((item, pos) => allComands.indexOf(item) === pos);

  let allObservers = observers.concat(mandatoryObservers, autoCenter ? 'gps' : []);
  allObservers = allObservers.filter((item, pos) => allObservers.indexOf(item) === pos);

  await RxDynamicMap.load(type, allComands, allObservers, options);

  RxDynamicMap.create(id, mapCenter.lat, mapCenter.lng, zoom);
  if (autoCenter) {
    RxDynamicMap.observer('gps')
      .pipe(take(1))
      .setCenter(res => ({ lat: res.latitude, lng: res.longitude }))
      .subscribe();
  }
  if (dataTypes) {
    dataTypes.forEach(element => RxDynamicMap.setDataType(element.id, element.geomType, element.style));
  }

  return RxDynamicMap;
};

export default RxMapFromConfig;
