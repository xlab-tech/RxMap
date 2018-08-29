import { Observable } from 'rxjs/internal/Observable';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

const _operators = {};
let AsyncCommandBus = null;
let _pipe = null;

const getArgs = (param, value) => {
  let args = param;
  if (typeof param === 'function') {
    args = param(value);
  }
  if (args && !Array.isArray(args)) {
    args = [args];
  }
  return args;
};

const getCommandBus = (observable) => {
  const commandBus = observable.getCommandBus();
  if (commandBus) {
    return commandBus;
  }
  if (observable.source) {
    return getCommandBus(observable.source);
  }
  return null;
};

const _applyOperators = (observable) => {
  const obj = observable.prototype || observable;
  Object.keys(_operators).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = _operators[key];
  });
  return observable;
};

const applyCommandBus = (observable) => {
  // eslint-disable-next-line no-param-reassign
  const obj = observable.prototype || observable;
  if (!_pipe) {
    _pipe = obj.pipe;
  }
  obj.setCommandBus = function (commandBus) {
    if (commandBus instanceof AsyncCommandBus) {
      this._commandBus = commandBus;
    } else {
      this._commandBus = AsyncCommandBus.lift(commandBus, commandBus._commandsSubject);
    }
    return this;
  };
  // eslint-disable-next-line no-param-reassign
  obj.getCommandBus = function () {
    return this._commandBus;
  };
  // eslint-disable-next-line no-param-reassign
  obj.observer = function (observerName, ...args) {
    const commandBus = getCommandBus(this);
    return this.pipe(mergeMap(() => commandBus.observer(observerName, ...args)));
  };

  obj.pipe = function (...args) {
    const observer = _pipe.bind(this)(...args);
    const _commandBus = this.getCommandBus();
    if (!_commandBus) {
      return observer;
    }
    if (!_commandBus.setCommandBus) {
      _applyOperators(observer);
      applyCommandBus(observer);
    }
    return observer.setCommandBus(_commandBus);
  };

  return observable;
};


export const setAsyncCommandBus = (AsyncCommandBusClass) => { AsyncCommandBus = AsyncCommandBusClass; };

export const applyOperators = observable => applyCommandBus(_applyOperators(observable));

const registerOperator = (commandName) => {
  _operators[commandName] = function (someCallback) {
    const commandBus = getCommandBus(this);
    return this.pipe(concatMap((value) => {
      const args = getArgs(someCallback, value);
      const result = commandBus[commandName](...args);
      return result.getValue();
    }));
  };
  Observable.prototype[commandName] = _operators[commandName];
};

applyCommandBus(Observable);

export default registerOperator;
