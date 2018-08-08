import { registerMiddlewares } from './middlewares';
import CommandBus from './CommandBus';
import registerCommand from './registerCommand';
import { setObserver } from './registerObserver';
import './Observable';

let _Map;

export class RxMap extends CommandBus {
  constructor() {
    super();
    this._dataTypes = {};
  }

  register(commandName, command) {
    registerCommand(commandName, command);
  }

  registerObservable(observerName, observer) {
    setObserver(observerName, observer);
  }

  applyMiddlewares(commandName, ...middlewares) {
    registerMiddlewares(commandName, middlewares);
    if (typeof commandName === 'string') {
      registerCommand(commandName);
    } else {
      registerCommand();
    }
  }

  init() {
    return new RxMap();
  }

  /**
     * style:  icon / size / color / opacity / width / fillColor / radius
     * geomType: marker / point / line / polygon
     */
  setDataType(id, geomType, style) {
    this._dataTypes[id] = { geomType, style };
  }

  getDataType(id) {
    return this._dataTypes[id];
  }
}

const createMap = () => {
  if (!_Map) {
    _Map = new RxMap();
  }
  return _Map;
};

export default createMap();
