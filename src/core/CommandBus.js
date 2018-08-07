
import isPromise from '../utils/isPromise.js';
import { getObserver } from './registerObserver.js';
import { from } from 'rxjs/internal/observable/from';

class CommandBus {
    constructor() {
        this._lastCommand = {
            'value': null,
            'name': null
        }
    }
    setMap(map) {
        this._rMap = map;
    }
    getMap() {
        return this._rMap;
    }

    value(callback) {
        if (callback) {
            callback(this._lastCommand);
            return this;
        }
        return this._lastCommand;
    }
    execute(commandName, command, args) {
        return this._execute(commandName, command, args);
    }
    _saveExecution(commandName, result) {
        this._lastCommand = {
            'value': result,
            'name': commandName
        }
        return result;
    }
    _execute(commandName, command, args) {
        this._executingCommand = commandName;
        const ret = command(this, args);
        let value = ret;
        if (isPromise(ret)) {
            ret.then((data) => this._saveExecution(commandName, data));
        }
        return this._saveExecution(commandName, value);
    }
    getCommandName() {
        return this._executingCommand;
    }
    fromObserver(observer) {
        return observer.setCommandBus(this);
    }
    observer(observerName, ...args) {
        if (typeof observerName !== 'string') {
            return from(observerName).setCommandBus(this);
        }
        const observer = getObserver(observerName);
        if (!observer) {
            throw `Observer ${observerName} not register`;
        }
        return observer.bind(this)(...args).setCommandBus(this);
    }
}

export default CommandBus;
