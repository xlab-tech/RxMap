import { take } from 'rxjs/internal/operators/take';
import RxMap from './RxMap';
import isPromise from './utils/isPromise';

const mandatoryCommands = ['create'];
const mandatoryObservers = [];

const RxMapFromConfig = async (id, config) => {
  const {
    type, commands, observers, map, options, dataTypes,
  } = config;
  const { center, zoom, autoCenter } = map;
  const mapCenter = center || { lat: 0, lng: 0 };

  if (commands) {
    let allComands = commands.concat(mandatoryCommands);
    allComands = allComands.filter((item, pos) => allComands.indexOf(item) === pos);
    options.commands = allComands;
  }

  if (observers) {
    let allObservers = observers.concat(mandatoryObservers, autoCenter ? 'gps' : []);
    allObservers = allObservers.filter((item, pos) => allObservers.indexOf(item) === pos);
    options.observers = allObservers;
  }

  await RxMap.load(type, options);

  const create = RxMap.create(id, mapCenter.lat, mapCenter.lng, zoom);

  if (isPromise(create)) {
    await new Promise(resolve => create.subscribe(data => resolve(data)));
  }

  if (autoCenter) {
    RxMap.observer('gps')
      .pipe(take(1))
      .setCenter(res => ({ lat: res.latitude, lng: res.longitude }))
      .subscribe();
  }
  if (dataTypes) {
    dataTypes.forEach(element => RxMap.setDataType(element.id, element.geomType, element.style));
  }

  return RxMap;
};

export default RxMapFromConfig;
