
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import isPromise from '../utils/isPromise';

const _operators = {};

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
    this._commandBus = commandBus;
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
  // obj._pipe = obj.pipe;
  obj.pipe = function (...args) {
    const observer = _pipe.bind(this)(...args);
    const _commandBus = this.getCommandBus();
    _applyOperators(observer);
    applyCommandBus(observer);
    return observer.setCommandBus(_commandBus);
  };
  return observable;
};

export const applyOperators = observable => applyCommandBus(_applyOperators(observable));

const registerOperator = (commandName, command) => {
  _operators[commandName] = function (someCallback) {
    const commandBus = getCommandBus(this);
    return this.pipe(concatMap((value) => {
      const args = getArgs(someCallback, value);
      const result = commandBus.execute(commandName, command, args);
      if (!isPromise(result)) {
        return of(result);
      }
      return from(result);
    }));
  };
};
export default registerOperator;
