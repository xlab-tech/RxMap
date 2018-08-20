
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import Observable, { getCommandBus } from './Observable';
import isPromise from '../utils/isPromise';

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

const registerOperator = (commandName, command) => {
  Observable.prototype[commandName] = function (someCallback) {
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
