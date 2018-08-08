import { registerMiddlewares } from './middlewares.js';
import CommandBus from './CommandBus.js';
import { registerCommand } from './registerCommand.js';
import { setObserver } from './registerObserver.js';
import './Observable.js';

let _Map;

const createMap = () => {
    if (!_Map) {
        _Map = new RxMap();
    }
    return _Map;
};

export class RxMap extends CommandBus {
    constructor() {
        super();
        this._dataTypes = {};
        // TODO: buscar otra manaera de detectar los modulos comunes
        console.log('Create Map instance');
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

export default createMap();
