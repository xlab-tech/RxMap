import { registerMiddlewares } from './middlewares.js';
import CommandBus from './CommandBus.js';
import { registerCommand } from './registerCommand.js';
import { setObserver } from './registerObserver.js';
import './Observable.js';

let Map;

const createMap = () => {
    if (!Map) {
        Map = new RxMap();
    }
    return Map;
};

export class RxMap extends CommandBus {
    constructor() {
        super();
        this._types = new Map();
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
    
    setType(id, geomType, style) {
        this._types.set(id, { geomType, style });
    }
    getType(id) {
        return this._types.get(id);
    }
}

export default createMap();
