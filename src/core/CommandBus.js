
import { from } from 'rxjs/internal/observable/from';
import isPromise from '../utils/isPromise';
import { getObserver } from './registerObserver';
import { applyOperators } from './registerOperator';

const _applyCommandBus = (observer) => {
  if (!observer.setCommandBus) {
    applyOperators(observer);
  }
};

class CommandBus {
  constructor() {
    this._lastCommand = {
      value: null,
      name: null,
    };
  }

  getSource() {
    return this;
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

  fromObserver(observer) {
    _applyCommandBus(observer);
    return observer.setCommandBus(this);
  }

  observer(observerName, ...args) {
    if (typeof observerName !== 'string') {
      const obser = from(observerName);
      _applyCommandBus(obser);
      return obser.setCommandBus(this);
    }
    const observer = getObserver(observerName);

    if (!observer) {
      throw new Error(`Observer ${observerName} not register`);
    }
    const obser = observer(this.getContext(), ...args);
    _applyCommandBus(obser);
    return obser.setCommandBus(this);
  }

  getContext() {
    return null;
  }
}

export default CommandBus;
