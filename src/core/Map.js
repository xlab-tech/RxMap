import { registerMiddlewares } from './middlewares.js';
import CommandBus from './CommandBus.js';
import { registerCommand } from './registerCommand.js';
import { setObserver } from './registerObserver.js';
import './Observable.js';

let Map;

const createMap = () => {
    if (!Map){
        Map = new rMap();
    }
    return Map;
};

class rMap extends CommandBus {
    constructor() {
        super();
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
    init(...args) {
        return new rMap(...args);
    };
}
/*
rMap.register = (commandName, command) => {
    registerCommand(commandName, command);
};

rMap.registerObservable = (observerName, observer) => {
    setObserver(observerName, observer);
};

rMap.applyMiddlewares = (commandName, ...middlewares) => {
    registerMiddlewares(commandName, middlewares);
    if (typeof commandName === 'string') {
        registerCommand(commandName);
    } else {
        registerCommand();
    }
};

rMap.init = function (...args) {
    return new rMap(...args);
};
*/

export default createMap();
