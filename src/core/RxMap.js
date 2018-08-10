
import CommandBus from './CommandBus';

let _Map;

export class RxMap extends CommandBus {
  constructor() {
    super();
    this.createAsync = false;
    this._dataTypes = {};
    super.setSource(this);
  }

  setMap(map) {
    this._sourceMap = map;
  }

  getMap() {
    return this._sourceMap;
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
