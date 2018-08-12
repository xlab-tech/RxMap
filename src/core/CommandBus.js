
import { from } from 'rxjs/internal/observable/from';
import isPromise from '../utils/isPromise';
import { getObserver } from './registerObserver';
import { registerMiddlewares } from './middlewares';
import './Observable';

class CommandBus {
  constructor() {
    this._lastCommand = {
      value: null,
      name: null,
    };
  }

  setSource(source) {
    this._source = source;
  }

  getRxMap() {
    return this._source;
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
      value: result,
      name: commandName,
    };
    this._executingCommand = false;
    return result;
  }

  _execute(commandName, command, args) {
    this._executingCommand = commandName;
    const ret = command(this, args);
    const value = ret;
    if (isPromise(ret)) {
      return ret.then(data => this._saveExecution(commandName, data));
    }
    return this._saveExecution(commandName, value);
  }

  isExecuting() {
    return !!this._executingCommand;
  }

  getCommandName() {
    return this._executingCommand;
  }

  applyMiddlewares(commandName, ...middlewares) {
    registerMiddlewares(commandName, middlewares);
    /* if (typeof commandName === 'string') {
      registerCommand( commandName);
    } else {
      registerCommand();
    } */
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
      throw new Error(`Observer ${observerName} not register`);
    }

    return observer(this.getContext(), ...args).setCommandBus(this);
  }

  getContext() {
    return {
      RxMap: this.getRxMap(),
      lastExecution: this.value(),
      library: this.getRxMap().getMapLibrary(),
    };
  }
}

export default CommandBus;
